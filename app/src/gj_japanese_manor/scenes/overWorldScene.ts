/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */
import {Assets} from "../assets";
import {Constants} from "../constants";
import * as socketIo from "socket.io-client";
import {SharedConstants} from "../../shared/sharedConstants";
import {Position, PlayerInfo} from "../../shared/playerInfo";

export class OverWorldScene extends Phaser.Scene {

    public static readonly TILESET_NAME = 'Overworld_Tileset';
    private map: Phaser.Tilemaps.Tilemap;
    private layer0: Phaser.Tilemaps.StaticTilemapLayer;
    private layer1: Phaser.Tilemaps.DynamicTilemapLayer;
    private layer2: Phaser.Tilemaps.DynamicTilemapLayer;
    private tiles: Phaser.Tilemaps.Tileset;
    private moveKeys: object;
    private player: Phaser.Physics.Arcade.Sprite;
    private io: SocketIOClient.Socket;


    constructor() {
        super({
            key: "OverWorldScene"
        });
    }

    preload(): void {
        this.load.image(Assets.TILES_OVERWORLD_IMAGE, Assets.url('Overworld_Tileset.png'));
        this.load.tilemapTiledJSON(Assets.TILES_OVERWORLD_MAP, Assets.url('Scenes.json'));
        this.load.image('player', './assets/boilerplate/phaser.png');
        this.physics.world.setBounds(0, 0, 9001, 9001);
    }

    create(): void {
        this.io = socketIo(Constants.SERVER_URL);
        this.io.connect();

        this.map = this.make.tilemap({
            key: Assets.TILES_OVERWORLD_MAP
        });
        this.tiles = this.map.addTilesetImage(OverWorldScene.TILESET_NAME, Assets.TILES_OVERWORLD_IMAGE);
        this.layer0 = this.map.createStaticLayer(0, this.tiles, 0, 0);
        this.layer1 = this.map.createDynamicLayer(1, this.tiles, 0, 0);
        this.layer2 = this.map.createDynamicLayer(2, this.tiles, 0, 0);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setOrigin(0.5, 0.5).setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE).setCollideWorldBounds(true).setDrag(500, 500);

        this.layer2.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.player, this.layer2);

        this.initializeInput();
        this.cameras.main.setZoom(2);

        if (Constants.DEBUG_ON) {
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            this.layer2.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        }
        if (this.io.connected) {
            console.log("Connected to server " + Constants.SERVER_URL);
        } else {
            console.log("Could not connect to server " + Constants.SERVER_URL);
        }

        this.io.on(SharedConstants.EVENT_PLAYER_UPDATE, (p: any) => {
            if (p.id !== this.io.id) {
                console.log("player update" + JSON.stringify(p));
            }
        });

    }


    constrainVelocity(sprite, maxVelocity) {
        if (!sprite || !sprite.body)
            return;

        let angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    private initializeInput() {
        let player = this.player;
        let camera = this.cameras.main;
        let scene = this.scene;

        // Creates object for input with WASD kets
        this.moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
        let moveKeys = this.moveKeys;

        // Enables movement of player with WASD keys
        this.input.keyboard.on('keydown_W', function (event) {
            player.setAccelerationY(-400);
        });
        this.input.keyboard.on('keydown_S', function (event) {
            player.setAccelerationY(400);
        });
        this.input.keyboard.on('keydown_A', function (event) {
            player.setAccelerationX(-400);
        });
        this.input.keyboard.on('keydown_D', function (event) {
            player.setAccelerationX(400);
        });
        // Stops player acceleration on uppress of WASD keys
        this.input.keyboard.on('keyup_W', function (event) {
            if (moveKeys['down'].isUp)
                player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_S', function (event) {
            if (moveKeys['up'].isUp)
                player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_A', function (event) {
            if (moveKeys['right'].isUp)
                player.setAccelerationX(0);
        });
        this.input.keyboard.on('keyup_D', function (event) {
            if (moveKeys['left'].isUp)
                player.setAccelerationX(0);
        });
        this.input.keyboard.on('keydown_Z', function (event) {
            camera.setZoom(camera.zoom + 0.1);
        });
        this.input.keyboard.on('keydown_T', function (event) {
            camera.setZoom(camera.zoom - 0.1);
        });

        this.input.keyboard.on('keydown_B', function (event) {
            player.setAcceleration(0, 0);
            player.setVelocity(0, 0);
            scene.switch('BattleScene'); // Start the battle scene
        });
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        // Camera follows player ( can be set in create )
        this.cameras.main.startFollow(this.player);
        this.constrainVelocity(this.player, 100);
        let y = this.player.body.velocity.y * 100;
        let x = this.player.body.velocity.x * 100;
        if (x != 0 && y != 0) {
            this.player.rotation = Math.atan2(y, x);
        }
        if (this.player.body.speed !== 0) {
            let playerData = new PlayerInfo(new Position(this.player.x, this.player.y));
            this.io.emit(SharedConstants.EVENT_PLAYER_MOVED, playerData);
        }

    }
}

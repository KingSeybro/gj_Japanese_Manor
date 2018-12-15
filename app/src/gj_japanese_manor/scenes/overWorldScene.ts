/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */
import {Assets} from "../assets";
import {Constants} from "../constants";
import {SharedConstants} from "../../shared/sharedConstants";
import {PlayerInfo, Position} from "../../shared/playerInfo";
import {BaseTileMapScene} from "./baseTileMapScene";
import {Globals} from "../globals";
import {Websocket} from "../websocket";

export class OverWorldScene extends BaseTileMapScene {

    public static readonly TILESET_NAME = 'Overworld_Tileset';


    private moveKeys: object;
    private player: Phaser.Physics.Arcade.Sprite;


    public otherPlayers: Map<string, Phaser.Physics.Arcade.Sprite>;

    constructor() {
        super({
            key: "OverWorldScene"
        }, ['overworld', 'Inside_A4', 'Inside_A2', 'Outside_B']);
        this.otherPlayers = new Map<string, Phaser.Physics.Arcade.Sprite>();
        this.layers = new Map<number, Phaser.Tilemaps.StaticTilemapLayer>();
        this.tiles = new Map<string, Phaser.Tilemaps.Tileset>();
        this.tilesMapping = new Map<number, string>();
    }

    preload(): void {
        super.preload();
        this.load.tilemapTiledJSON(Assets.TILES_OVERWORLD_MAP, Assets.url('tilemap', 'prototype.json'));
        this.load.image('player', Assets.url('game', 'phaser.png'));
        this.physics.world.setBounds(0, 0, 9001, 9001);
    }

    create(): void {
        Websocket.init();

        this.initMap(Assets.TILES_OVERWORLD_MAP);


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player
            .setOrigin(0.5, 0.5)
            .setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE)
            .setCollideWorldBounds(true)
            .setDrag(500, 500);
        this.player.body.allowRotation = true;

        this.setUpCollisionLayer([1, 2], this.player);

        this.initializeInput();
        this.cameras.main.setZoom(2);

        if (Globals.DEBUG_ON) {
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            // collisionLayer.renderDebug(debugGraphics, {
            //     tileColor: null, // Color of non-colliding tiles
            //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            // });

        }
        if (Websocket.isConnected()) {
            console.log("Connected to server " + Constants.SERVER_URL);
        } else {
            console.log("Could not connect to server " + Constants.SERVER_URL);
        }

        const self = this;

        Websocket.io.on(SharedConstants.EVENT_PLAYER_UPDATE, (p: any) => {

            if (p.id !== Websocket.io.id) {
                // console.log("player update" + JSON.stringify(p));
                if (!self.otherPlayers.get(p.id)) {
                    let otherPlayer = this.physics.add.sprite(p.x, p.y, 'player');
                    otherPlayer.setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE);
                    self.otherPlayers.set(p.id, otherPlayer);
                } else {
                    // console.log("update " + p.id);
                    self.otherPlayers.get(p.id).y = p.y;
                    self.otherPlayers.get(p.id).x = p.x;
                }
            }

        });

        Websocket.io.on(SharedConstants.EVENT_PLAYER_DISCONNECTED, (p: any) => {
            console.log('Disconnected player ' + p);
            self.otherPlayers.get(p).destroy();
            self.otherPlayers.delete(p);
        });

        Websocket.io.emit(SharedConstants.EVENT_PLAYER_JOINED, this.getCurrentPlayerData());
        this.sendPlayerMoved();

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
        this.input.keyboard.on('keyup_O', function (event) {
           Globals.DEBUG_ON = !Globals.DEBUG_ON;
           console.log(Globals.DEBUG_ON);
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
            this.sendPlayerMoved();
        }

    }

    private sendPlayerMoved(): void {
        Websocket.io.emit(SharedConstants.EVENT_PLAYER_MOVED, this.getCurrentPlayerData());
    }

    private getCurrentPlayerData(): PlayerInfo {
        let playerData = new PlayerInfo(new Position(this.player.x, this.player.y));
        return playerData;
    }
}

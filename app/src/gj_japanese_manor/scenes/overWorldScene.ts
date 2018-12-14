/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */
import {Assets} from "../assets";
import {Constants} from "../constants";

export class OverWorldScene extends Phaser.Scene {

    public static readonly TILESET_NAME = 'Overworld_Tileset';
    private map: Phaser.Tilemaps.Tilemap;
    private layer0: Phaser.Tilemaps.StaticTilemapLayer;
    private layer1: Phaser.Tilemaps.DynamicTilemapLayer;
    private layer2: Phaser.Tilemaps.StaticTilemapLayer;
    private tiles: Phaser.Tilemaps.Tileset;
    private moveKeys: object;
    private player: Phaser.Physics.Arcade.Sprite;
    private tiles1: Phaser.Tilemaps.Tileset;
    private layer4: Phaser.Tilemaps.StaticTilemapLayer;
    private tiles2: Phaser.Tilemaps.Tileset;
    private tiles3: Phaser.Tilemaps.Tileset;
    private layer3: Phaser.Tilemaps.StaticTilemapLayer;


    constructor() {
        super({
            key: "OverWorldScene"
        });
    }

    preload(): void {
        this.load.image("overworld", Assets.url('overworld.png'));
        this.load.image("Inside_A4", Assets.url('Inside_A4.png'));
        this.load.image("Inside_A2", Assets.url('Inside_A2.png'));
        this.load.image("Outside_B", Assets.url('Outside_B.png'));

        this.load.tilemapTiledJSON(Assets.TILES_OVERWORLD_MAP, Assets.url('prototype.json'));

        this.load.image('player', Assets.url('phaser.png'));
        this.physics.world.setBounds(0, 0, 9001, 9001);
    }

    create(): void {
        this.map = this.make.tilemap({ key: Assets.TILES_OVERWORLD_MAP });
        this.tiles = this.map.addTilesetImage("Overworld_Tileset (2)", "overworld");
        this.tiles1 = this.map.addTilesetImage("Inside_A4", "Inside_A4");
        this.tiles2 = this.map.addTilesetImage("Inside_A2", "Inside_A2");
        this.tiles3 = this.map.addTilesetImage("Outside_B", "Outside_B");
        this.layer0 = this.map.createStaticLayer(0, this.tiles, 0, 0);
        this.layer1 = this.map.createDynamicLayer(1, this.tiles1, 0, 0);
        this.layer2 = this.map.createStaticLayer(2, this.tiles2, 0, 0);
        this.layer3 = this.map.createStaticLayer(3, this.tiles3, 0, 0);
        this.layer4 = this.map.createStaticLayer(4, this.tiles, 0, 0);


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setOrigin(0.5, 0.5).setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE).setCollideWorldBounds(true).setDrag(500, 500);

        this.layer1.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.player, this.layer1);

        this.initializeInput();
        this.cameras.main.setZoom(2);

        if (Constants.DEBUG_ON) {
            const debugGraphics = this.add.graphics().setAlpha(0.75);

        }
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
            player.setAcceleration(0,0);
            player.setVelocity(0,0);
            scene.switch('BattleScene'); // Start the battle scene
        });
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        // Camera follows player ( can be set in create )
        this.cameras.main.startFollow(this.player);
        this.constrainVelocity(this.player,100);
        let y = this.player.body.velocity.y*100;
        let x = this.player.body.velocity.x*100;
        if(x!=0 && y!=0){
            this.player.rotation =  Math.atan2(y, x);
        }
    }
}

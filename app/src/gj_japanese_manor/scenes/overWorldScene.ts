/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */
import {Assets} from "../assets";

export class OverWorldScene extends Phaser.Scene {

    public static readonly TILESET_NAME = 'Overworld_Tileset';
    private map: Phaser.Tilemaps.Tilemap;
    private layer: Phaser.Tilemaps.StaticTilemapLayer;
    private tiles: Phaser.Tilemaps.Tileset;
    private moveKeys: object;
    private player: Phaser.Physics.Arcade.Sprite;



    constructor() {
        super({
            key: "OverWorldScene"
        });
    }

    preload(): void {
        this.load.image(Assets.TILES_OVERWORLD_IMAGE, Assets.url('Overworld_Tileset.png'));
        this.load.tilemapTiledJSON(Assets.TILES_OVERWORLD_MAP, Assets.url('Scenes.json'));
        this.load.image('player', './assets/boilerplate/player.png');
        this.physics.world.setBounds(0, 0, 9001, 9001);
    }

    create(): void {
        this.map = this.make.tilemap({'key': Assets.TILES_OVERWORLD_MAP});
        this.tiles = this.map.addTilesetImage(OverWorldScene.TILESET_NAME, Assets.TILES_OVERWORLD_IMAGE);
        this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);
        this.cameras.main.setBounds(0, 0, 10, 10);

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setOrigin(0.5, 0.5).setDisplaySize(32, 32).setCollideWorldBounds(true).setDrag(500, 500);

        this.initializeInput();
    }

    constrainVelocity(sprite, maxVelocity)
    {
        if (!sprite || !sprite.body)
            return;

        var angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    private initializeInput() {
        let player = this.player;

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
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        // Camera follows player ( can be set in create )
        this.cameras.main.startFollow(this.player);
        this.constrainVelocity(this.player,200);
    }
}

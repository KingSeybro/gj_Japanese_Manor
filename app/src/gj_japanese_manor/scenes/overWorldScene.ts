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

        // Creates object for input with WASD kets
        this.moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setOrigin(0.5, 0.5).setDisplaySize(32, 32).setCollideWorldBounds(true).setDrag(500, 500);

        this.initializeInput();
    }


    private initializeInput() {
        const self = this;
        // Enables movement of player with WASD keys
        this.input.keyboard.on('keydown_W', function (event) {
            self.player.setAccelerationY(-400);
        });
        this.input.keyboard.on('keydown_S', function (event) {
            self.player.setAccelerationY(400);
        });
        this.input.keyboard.on('keydown_A', function (event) {
            self.player.setAccelerationX(-400);
        });
        this.input.keyboard.on('keydown_D', function (event) {
            self.player.setAccelerationX(400);
        });
        // Stops player acceleration on uppress of WASD keys
        this.input.keyboard.on('keyup_W', function (event) {
            if (self.moveKeys['down'].isUp)
                self.player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_S', function (event) {
            if (self.moveKeys['up'].isUp)
                self.player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_A', function (event) {
            if (self.moveKeys['right'].isUp)
                self.player.setAccelerationX(0);
        });
        this.input.keyboard.on('keyup_D', function (event) {
            if (self.moveKeys['left'].isUp)
                self.player.setAccelerationX(0);
        });
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        // Camera follows player ( can be set in create )
        this.cameras.main.startFollow(this.player);
    }
}

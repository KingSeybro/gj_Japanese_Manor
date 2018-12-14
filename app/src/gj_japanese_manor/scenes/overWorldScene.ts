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
    private layer2: Phaser.Tilemaps.DynamicTilemapLayer;
    private tiles: Phaser.Tilemaps.Tileset;
    private controls: Phaser.Cameras.Controls.FixedKeyControl;


    constructor() {
        super({
            key: "OverWorldScene"
        });
    }

    preload(): void {
        this.load.image(Assets.TILES_OVERWORLD_IMAGE, Assets.url('Overworld_Tileset.png'));
        this.load.tilemapTiledJSON(Assets.TILES_OVERWORLD_MAP, Assets.url('Scenes.json'));
    }

    create(): void {
        this.map = this.make.tilemap({
            key: Assets.TILES_OVERWORLD_MAP
        });
        this.tiles = this.map.addTilesetImage(OverWorldScene.TILESET_NAME, Assets.TILES_OVERWORLD_IMAGE);
        this.layer0 = this.map.createStaticLayer(0, this.tiles, 0, 0);
        this.layer1 = this.map.createDynamicLayer(1, this.tiles, 0, 0);
        this.layer2 = this.map.createDynamicLayer(2, this.tiles, 0, 0);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        let cursors = this.input.keyboard.createCursorKeys();

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.cameras.main,
            speed: 0.5,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            zoomIn: cursors.shift,
            zoomOut: cursors.space,
            down: cursors.down
        });
        this.cameras.main.setZoom(0.5);
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
        this.controls.update(delta);
    }
}

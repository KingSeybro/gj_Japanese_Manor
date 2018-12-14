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
        this.map = this.make.tilemap({'key': Assets.TILES_OVERWORLD_MAP});
        this.tiles = this.map.addTilesetImage(OverWorldScene.TILESET_NAME, Assets.TILES_OVERWORLD_IMAGE);
        this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);
        this.cameras.main.setBounds(0, 0, 10, 10);
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}

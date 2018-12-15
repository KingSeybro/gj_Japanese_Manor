/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */
import {Assets} from "../assets";
import {Constants} from "../constants";

export class BaseTileMapScene extends Phaser.Scene {


    protected map: Phaser.Tilemaps.Tilemap;
    protected layers: Map<number, Phaser.Tilemaps.StaticTilemapLayer>;
    protected tiles: Map<string, Phaser.Tilemaps.Tileset>;
    protected tilesMapping: Map<number, string>;

    protected imagesToLoad: string[];

    constructor(config: string | Phaser.Scenes.Settings.Config, imagesToLoad: string[]) {
        super(config);
        this.layers = new Map<number, Phaser.Tilemaps.StaticTilemapLayer>();
        this.tiles = new Map<string, Phaser.Tilemaps.Tileset>();
        this.tilesMapping = new Map<number, string>();
        this.imagesToLoad = imagesToLoad;
    }

    preload(): void {
        for (const img of this.imagesToLoad) {
            this.load.image(img, Assets.url(img + '.png'));
        }
    }

    create(): void {
        this.initMap(Assets.TILES_OVERWORLD_MAP);
    }

    protected initMap(keyMap): void {
        this.map = this.make.tilemap({
            key: keyMap
        });
        this.map = this.make.tilemap({key: keyMap});

        for (let i = 0; i < this.map.tilesets.length; i++) {
            const tileset = this.map.tilesets[i];
            let newTileset = this.map.addTilesetImage(tileset.name, tileset.name, Constants.TILE_SIZE, Constants.TILE_SIZE);
            this.tiles.set(tileset.name, newTileset);
            console.log(tileset.name);

            this.tilesMapping.set(i, tileset.name);
        }

        for (let i = 0; i < this.map.layers.length; i++) {
            const layer = this.map.layers[i];
            let keyTile = this.tilesMapping.get(i);
            let staticTilemapLayer = this.map.createStaticLayer(i, this.tiles.get(keyTile), 0, 0);
            this.layers.set(i, staticTilemapLayer);
        }
    }
}

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
    protected collideableLayers: Phaser.Tilemaps.StaticTilemapLayer[];
    protected tiles: Map<string, Phaser.Tilemaps.Tileset>;
    protected tilesMapping: Map<number, string>;

    protected imagesToLoad: string[];

    constructor(config: string | Phaser.Scenes.Settings.Config, imagesToLoad: string[]) {
        super(config);
        this.layers = new Map<number, Phaser.Tilemaps.StaticTilemapLayer>();
        this.tiles = new Map<string, Phaser.Tilemaps.Tileset>();
        this.tilesMapping = new Map<number, string>();
        this.imagesToLoad = imagesToLoad;
        this.collideableLayers = [];
    }

    preload(): void {
        for (const img of this.imagesToLoad) {
            this.load.image(img, Assets.url('tilemap', img + '.png'));
        }
    }

    create(): void {
        this.initMap(Assets.TILES_OVERWORLD_MAP);
    }

    protected initMap(keyMap): void {
        console.log("Init map " + keyMap + " now");
        this.map = this.make.tilemap({
            key: keyMap
        });
        this.map = this.make.tilemap({key: keyMap});

        for (let i = 0; i < this.map.tilesets.length; i++) {
            const tileset = this.map.tilesets[i];
            let newTileset = this.map.addTilesetImage(tileset.name, tileset.name, Constants.TILE_SIZE, Constants.TILE_SIZE);
            this.tiles.set(tileset.name, newTileset);
            this.tilesMapping.set(i, tileset.name);
        }

        for (let i = 0; i < this.map.layers.length; i++) {
            const layer = this.map.layers[i];
            let keyTile = this.tilesMapping.get(i);
            let staticTilemapLayer = this.map.createStaticLayer(i, this.tiles.get(keyTile), 0, 0);
            this.layers.set(i, staticTilemapLayer);
        }
    }

    protected setUpCollisionLayer(ids: number[], object1: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        if (this.collideableLayers.length == 0) {
            for (const id of ids) {
                this.collideableLayers.push(this.layers.get(id));
            }
        } else {
            console.log("Setup collision layer called twice will not init layers again");
        }

        for (let i = 0; i < this.collideableLayers.length; i++) {
            this.collideableLayers[i].setCollisionByProperty({collides: true});
            this.physics.add.collider(object1, this.collideableLayers[i]);
        }
    }
}
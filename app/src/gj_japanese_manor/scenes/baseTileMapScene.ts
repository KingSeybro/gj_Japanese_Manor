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
    protected tiles: Phaser.Tilemaps.Tileset[];
    protected tilesMapping: Map<number, string>;

    protected imagesToLoad: string[];

    constructor(config: string | Phaser.Scenes.Settings.Config, imagesToLoad: string[]) {
        super(config);
        this.layers = new Map<number, Phaser.Tilemaps.StaticTilemapLayer>();
        this.tiles = [];
        this.tilesMapping = new Map<number, string>();
        this.imagesToLoad = imagesToLoad;
        this.collideableLayers = [];
    }

    /**
     * Will load all images passed from imagesToLoad array
     */
    preload(): void {
        for (const img of this.imagesToLoad) {
            this.load.image(img, Assets.url('tilemap', img + '.png'));
        }
    }

    /**
     * Loads the tilesets and layers no collision layer set at this
     * point of time
     * @param keyMap
     */
    protected initMap(keyMap): void {
        console.log("Init map " + keyMap + " now");
        this.map = this.make.tilemap({
            key: keyMap
        });
        this.map = this.make.tilemap({key: keyMap});


        for (let i = 0; i < this.map.tilesets.length; i++) {
            const tileset = this.map.tilesets[i];
            let newTileset = this.map.addTilesetImage(tileset.name, tileset.name, Constants.TILE_SIZE, Constants.TILE_SIZE);
            this.tiles.push(newTileset);
            this.tilesMapping.set(i, tileset.name);
        }

        for (let i = 0; i < this.map.layers.length; i++) {
            const layer = this.map.layers[i];
            let keyTile = this.tilesMapping.get(i);
            // @ts-ignore
            let staticTilemapLayer = this.map.createStaticLayer(i, this.tiles, 0, 0);
            this.layers.set(i, staticTilemapLayer);
        }
    }

    /**
     * Sets up the collision between the layers in ids array
     * and the object1 parameter.
     *
     * @param {number[]} ids
     * @param {Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]} object1
     */
    protected setUpCollisionLayer(ids: number[], object1: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        for (const id of ids) {
            this.collideableLayers.push(this.layers.get(id));
        }

        for (let i = 0; i < this.collideableLayers.length; i++) {
            this.collideableLayers[i].setCollisionByProperty({collides: true});
            this.physics.add.collider(object1, this.collideableLayers[i]);
        }
    }
}

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
import {CombatData} from "../../shared/data";

export class OverWorldScene extends BaseTileMapScene {

    public static readonly TILESET_NAME = 'Overworld_Tileset';


    private moveKeys: object;
    private player: Phaser.Physics.Arcade.Sprite;


    public otherPlayers: Map<string, Phaser.Physics.Arcade.Sprite>;
    private gracePeriod: number;
    private static DEFAULT_GRACE_PERIOD: number = 2000;
    private wasInBattleScreen: boolean;

    constructor() {
        super({
            key: "OverWorldScene"
        }, ['background_tiles']);
        this.otherPlayers = new Map<string, Phaser.Physics.Arcade.Sprite>();
        this.layers = new Map<number, Phaser.Tilemaps.StaticTilemapLayer>();
        this.tilesMapping = new Map<number, string>();
    }

    preload(): void {
        super.preload();
        this.load.tilemapTiledJSON(Assets.TILES_OVERWORLD_MAP, Assets.url('tilemap', 'map.json'));
        this.load.image('player', Assets.url('game', 'phaser.png'));
        this.physics.world.setBounds(0, 0, 500*Constants.TILE_SIZE, 500*Constants.TILE_SIZE);
    }


    create(): void {
        Websocket.init();

        this.gracePeriod = OverWorldScene.DEFAULT_GRACE_PERIOD;
        this.initMap(Assets.TILES_OVERWORLD_MAP);


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.player = this.physics.add.sprite(Math.random()*4000, Math.random()*3000, 'player');
        this.player
            .setOrigin(0.5, 0.5)
            .setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE)
            .setCollideWorldBounds(true)
            .setDrag(500, 500);
        this.player.body.stopVelocityOnCollide = true;

        this.setUpCollisionLayer([1], this.player);

        this.initializeInput();
        this.cameras.main.setZoom(Constants.DEFAULT_ZOOM);

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

        Websocket.io.on(SharedConstants.EVENT_PLAYER_UPDATE, (p: PlayerInfo) => {

            if (p.id !== Websocket.io.id) {
                console.log("player update" + JSON.stringify(p));
                if (!self.otherPlayers.get(p.id)) {
                    let otherPlayer = this.physics.add.sprite(p.position.x, p.position.y, 'player');
                    otherPlayer.setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE)
                        .setCollideWorldBounds(true)
                        .setDrag(500, 500);
                        otherPlayer.body.stopVelocityOnCollide=true;
                    //self.physics.add.collider(otherPlayer, self.player);
                    self.otherPlayers.set(p.id, otherPlayer);
                    self.physics.add.overlap(self.player, otherPlayer, this.collideCallback, null, self);

                } else {
                    // console.log("update " + p.id);
                    self.otherPlayers.get(p.id).y = p.position.y;
                    self.otherPlayers.get(p.id).x = p.position.x;
                }
            }

        });

        Websocket.io.on(SharedConstants.EVENT_PLAYER_DISCONNECTED, (p: any) => {
            console.log('Disconnected player ' + p);
            let otherPlayer = self.otherPlayers.get(p);
            if (!otherPlayer) {
                otherPlayer.destroy();
                self.otherPlayers.delete(p);
            }
        });

        Websocket.io.on(SharedConstants.EVENT_PLAYER_START_BATTLE, (o: CombatData) => {
            console.log('Other player ' + o.otherPlayer.id + ' wants to start a battle');
            this.scene.switch('BattleScene');
        });


        // Generic event sample
        // let enemyId = self.otherPlayers.entries()[0].id;
        // let enemyId = 'test';
        // Websocket.io.emit('generic_event', {enemyId: enemyId})

        //actions create finished
        Websocket.io.emit(SharedConstants.EVENT_PLAYER_JOINED, this.getCurrentPlayerData());
        this.sendPlayerMoved();


    }

    private collideCallback(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
        if(object1 == this.player){
            console.log("o1");
            var value;
            var self =this;
            for (let [key, v] of this.otherPlayers) {
                console.log(key);
                if(v==object2){
                    value = key;
                }
            }
            Object.keys(this.otherPlayers).forEach(function(key) {

            });
        }else if(object2 == this.player){
            console.log("o2");
            var value;
            var self =this;
            for (let [key, v] of this.otherPlayers) {
                console.log(key);
                if(v==object1){
                    value = key;
                }
            }
        }
        if(this.gracePeriod <=0)
            this.switchToBattleScreen(value);
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
        let self = this;

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
            player.setAccelerationY(-Constants.ACCELERATION);
        });
        this.input.keyboard.on('keydown_S', function (event) {
            player.setAccelerationY(Constants.ACCELERATION);
        });
        this.input.keyboard.on('keydown_A', function (event) {
            player.setAccelerationX(-Constants.ACCELERATION);
        });
        this.input.keyboard.on('keydown_D', function (event) {
            player.setAccelerationX(Constants.ACCELERATION);
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
            console.log(camera.zoom);
        });
        this.input.keyboard.on('keydown_T', function (event) {
            camera.setZoom(camera.zoom - 0.1);
        });
        this.input.keyboard.on('keyup_O', function (event) {
            Globals.DEBUG_ON = !Globals.DEBUG_ON;
            console.log(Globals.DEBUG_ON);
        });
        this.input.keyboard.on('keyup_H', function (event) {
            Globals.DEBUG_ON = !Globals.DEBUG_ON;
            console.log(Globals.DEBUG_ON);
        });

        this.input.keyboard.on('keydown_B', function (event) {
            player.setAcceleration(0, 0);
            player.setVelocity(0, 0);
            self.hitPlayer();
        });

        this.input.keyboard.on('keydown_C', function (event) {
          self.switchToConversationScreen();
        });

    }

    public switchToConversationScreen() {
        this.player.setAcceleration(0, 0).setVelocity(0, 0);
        this.scene.switch('ConversationScene'); // Start the battle scene
    }

    private switchToBattleScreen(key :string) {
        console.log(key);
        this.wasInBattleScreen = true;
        this.scene.switch('BattleScene'); // Start the battle scene
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        if(this.wasInBattleScreen)
        {
            this.wasInBattleScreen = false;
            this.gracePeriod = OverWorldScene.DEFAULT_GRACE_PERIOD;
            this.player.setVelocity(0,0);
            this.player.setAcceleration(0,0);
            console.log("reset was in screen");
        }
        this.gracePeriod-=delta;
        // Camera follows player ( can be set in create )
        this.cameras.main.startFollow(this.player);
        this.constrainVelocity(this.player, 400);
        let y = this.player.body.velocity.y * 100;
        let x = this.player.body.velocity.x * 100;
        if (x != 0 && y != 0) {
            this.player.rotation = Math.atan2(y, x);
        }
        if (this.player.body.speed !== 0) {
            this.sendPlayerMoved();
        }

    }

    private hitPlayer(): void {
        console.log("Player hit");
        let otherPlayerId = null;
        for (const id of this.otherPlayers.keys()) {
            if (id !== Websocket.io.id) {
                otherPlayerId = id;
                break;
            }
        }
        //todo: this should be the id passed
        Websocket.io.emit(SharedConstants.EVENT_PLAYER_START_BATTLE, {otherPlayerId: otherPlayerId});
    }

    private sendPlayerMoved(): void {
        // console.log("send player moved");
        Websocket.io.emit(SharedConstants.EVENT_PLAYER_MOVED, this.getCurrentPlayerData());
    }

    private getCurrentPlayerData(): PlayerInfo {
        let playerData = new PlayerInfo(Websocket.io.id, new Position(this.player.x, this.player.y));
        return playerData;
    }
}

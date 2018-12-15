import {Assets} from "../assets";
import {Constants} from "../constants";
import {Websocket} from "../websocket";
import {Globals} from "../globals";
import {SharedConstants} from "../../shared/sharedConstants";
import {CombatWrapper} from "../combatWrapper";
import {PlayerCombat} from "../../shared/playerCombat";

export class BattleScene extends Phaser.Scene {

    public meObject: PlayerCombat;
    public enemyObject: PlayerCombat;


    constructor() {
        //TODO SET PLAYER OBJECTS
        super({
            key: "BattleScene"
        });
    }

    preload(): void {

    }

    create(): void {
        console.log("created battle screen");
        let scene = this.scene;
        this.input.keyboard.on('keydown_B', function (event) {
            console.log("now!");
            scene.switch('OverWorldScene'); // Start the main scene
        });

        const self = this;

        Websocket.io.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (p: CombatWrapper) => {
            //
            // if (p.id !== Websocket.io.id) {
            //     // console.log("player update" + JSON.stringify(p));
            //     if (!self.otherPlayers.get(p.id)) {
            //         let otherPlayer = this.physics.add.sprite(p.x, p.y, 'player');
            //         otherPlayer.setDisplaySize(Constants.TILE_SIZE, Constants.TILE_SIZE)
            //             .setCollideWorldBounds(true)
            //             .setDrag(500, 500);
            //         otherPlayer.body.stopVelocityOnCollide=true;
            //         self.physics.add.collider(otherPlayer, self.player);
            //         self.otherPlayers.set(p.id, otherPlayer);
            //     } else {
            //         // console.log("update " + p.id);
            //         self.otherPlayers.get(p.id).y = p.y;
            //         self.otherPlayers.get(p.id).x = p.x;
            //     }
            // }

        });

        // Websocket.io.on(SharedConstants.EVENT_PLAYER_DISCONNECTED, (p: any) => {
        //     // console.log('Disconnected player ' + p);
        //     // self.otherPlayers.get(p).destroy();
        //     // self.otherPlayers.delete(p);
        // });

        // Websocket.io.emit(SharedConstants.EVENT_PLAYER_JOINED, this.getCurrentPlayerData());
        // this.sendPlayerMoved();
        //
        // // Generic event sample
        // // let enemyId = self.otherPlayers.entries()[0].id;
        // let enemyId = 'test';
        // Websocket.io.emit('generic_event', {enemyId: enemyId})




    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }

}

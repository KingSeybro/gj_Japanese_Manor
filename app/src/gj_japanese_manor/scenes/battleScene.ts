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
        this.load.image('bg', Assets.url('backgrounds','JM_Back_HS.png'));
        this.load.image('jb_char', Assets.url('characters','Jailbait Sketch.png'));
        this.load.image('fool_char', Assets.url('characters','Fool Sketch.png'));
    }

    create(): void {
        console.log("created battle screen");
        let scene = this.scene;
        this.input.keyboard.on('keydown_B', function (event) {
            console.log("now!");
            scene.switch('OverWorldScene'); // Start the main scene
        });

        this.input.keyboard.on('keydown_F', function (event) {
            let myturn = Globals.data.combat.attackerObject.id === Websocket.io.id;
            if (myturn) {
                console.log("was my turn switch now");
                console.log( Globals.data.combat);


                Globals.data.combat.attackerObject.basicAttack(Globals.data.combat.defenderObject);
                console.log(Globals.data.combat.attackerObject);
                Websocket.io.emit(SharedConstants.EVENT_PLAYER_COMBATACTION, Globals.data.combat);
            } else {
                console.log("not my turn");
            }
        });

        const self = this;

        Websocket.io.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (p: CombatWrapper) => {
            Globals.data.combat = p;
        });


    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }

}

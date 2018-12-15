import {Assets} from "../assets";
import {Constants} from "../constants";
import {Websocket} from "../websocket";
import {Globals} from "../globals";
import {SharedConstants} from "../../shared/sharedConstants";
import {CombatWrapper} from "../combatWrapper";
import {createPlayerCombatFromStructure, PlayerCombat} from "../../shared/playerCombat";

export class BattleScene extends Phaser.Scene {

    public meObject: PlayerCombat;
    public enemyObject: PlayerCombat;
    public lock: boolean;


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
        this.lock = false;
        let scene = this.scene;
        this.input.keyboard.on('keydown_B', function (event) {
            console.log("now!");
            scene.switch('OverWorldScene'); // Start the main scene
        });

        const self = this;
        this.input.keyboard.on('keydown_F', function (event) {
            //already press do nothing
            if (self.lock) {
                return;
            }

            let myturn = Globals.data.combat.attackerObject.id === Websocket.io.id;
            if (myturn) {
                self.lock = true;
                console.log("was my turn switch now");
                console.log(Globals.data.combat);
                let attacker = createPlayerCombatFromStructure(Globals.data.combat.attackerObject);
                let defender = createPlayerCombatFromStructure(Globals.data.combat.defenderObject);
                attacker.basicAttack(defender);

                let combat = new CombatWrapper(defender, attacker, "basic attack done", "basic attack done");
                Globals.data.combat = combat;
                Websocket.io.emit(SharedConstants.EVENT_PLAYER_COMBATACTION, combat);
            } else {
                console.log("not my turn");
            }
        });


        Websocket.io.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (p: CombatWrapper) => {
            console.log("Received combat event from server");
            Globals.data.combat = p;
            self.lock = false;
        });


    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }

}

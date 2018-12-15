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
        this.load.image('bg', Assets.url('backgrounds','JM_Back_HS.png'));
        this.load.image('jb_char', Assets.url('characters','Jailbait Sketch.png'));
        this.load.image('fool_char', Assets.url('characters','Fool Sketch.png'));
    }

    create(): void {
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'bg');
        let face1 = this.add.sprite(this.game.renderer.width/5 *4, 500, "jb_char");
        face1.displayWidth = 400;
        face1.scaleY = face1.scaleX;

        let face2 = this.add.sprite(this.game.renderer.width/5 *1, 500, "fool_char");
        face2.displayWidth = 400;
        face2.scaleY = face2.scaleX;


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
                attacker.attacksAndSpells[0].combatFunction(defender); //TODO choose which attack

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

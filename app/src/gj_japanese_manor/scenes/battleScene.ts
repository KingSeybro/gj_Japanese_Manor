import {Assets} from "../assets";
import {Constants} from "../constants";
import {Websocket} from "../websocket";
import {Globals} from "../globals";
import {SharedConstants} from "../../shared/sharedConstants";
import {CombatWrapper} from "../combatWrapper";
import {
    createPlayerCombatFromStructure,
    PlayerCombat,
    The_Fool,
    The_Jailbait,
    The_Naughty_Nerd, The_Sexy_Samurai
} from "../../shared/playerCombat";
import {CombatData} from "../../shared/data";
import {DialogBox} from "../dialogbox";

export class BattleScene extends Phaser.Scene {

    public meObject: PlayerCombat;
    public enemyObject: PlayerCombat;
    public lock: boolean;
    public text: Phaser.GameObjects.Text;
    public dbox: DialogBox;
    public hudText: Map<String, Phaser.GameObjects.Text>;
    constructor() {
        //TODO SET PLAYER OBJECTS
        super({
            key: "BattleScene"
        });
        this.hudText = new Map<String, Phaser.GameObjects.Text>();
    }

    preload(): void {
        this.load.image('bg', Assets.url('backgrounds', 'JM_Back_HS.png'));
        this.load.image(The_Fool.TYPE, Assets.url('characters', 'Fool Sketch.png'));
        this.load.image(The_Jailbait.TYPE, Assets.url('characters', 'Jailbait Sketch.png'));
        this.load.image(The_Naughty_Nerd.TYPE, Assets.url('characters', 'Naughty Nerd Sketch.png'));
        this.load.image(The_Sexy_Samurai.TYPE, Assets.url('characters', 'Zhe sexy samurai sketch.png'));
    }


    create(o: CombatData): void {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'bg');
        let face1 = this.add.sprite(this.game.renderer.width / 5 * 4, 500, o.combat.attackerObject.type);
        face1.displayWidth = 400;
        face1.scaleY = face1.scaleX;

        let face2 = this.add.sprite(this.game.renderer.width / 5 * 1, 500, o.combat.defenderObject.type);
        face2.displayWidth = 400;
        face2.scaleY = face2.scaleX;


        console.log("created battle screen");
        this.lock = false;
        let scene = this.scene;
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
                let attacker = createPlayerCombatFromStructure(Globals.data.combat.attackerObject);
                let defender = createPlayerCombatFromStructure(Globals.data.combat.defenderObject);
                attacker.basicAttack(defender);
                // attacker.attacksAndSpells[0].combatFunction(defender); //TODO choose which attack

                let summaryString = "basic attack done";
                let attackString = "basic attack done";
                let combat = new CombatWrapper(defender, attacker, summaryString, attackString, false, 0);
                Globals.data.combat = combat;
                Websocket.io.emit(SharedConstants.EVENT_PLAYER_COMBATACTION, combat);
                console.log('send data will wait now');
                self.renderActionText('Attack: '+ attackString + ' \n' +summaryString  + ' \n\nWait for other turn now');
            } else {
                self.renderActionText('Its not your turn now');
            }
        });


        Websocket.io.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (p: any) => {
            console.log("Received combat event from server");
            self.renderActionText('Enemy hit with ' + p.attackName + '\n' + p.summaryString + '\n\nIts you turn now');
            Globals.data.combat = p;
            self.renderHudText(p);
            self.lock = false;
        });

        Websocket.io.on(SharedConstants.EVENT_STOP_BATTLE, (p: CombatWrapper) => {
            let p1 = createPlayerCombatFromStructure(p.defenderObject);
            let p2 = createPlayerCombatFromStructure(p.attackerObject);

            let myself = null;
            let enemy = null;
            if (p1.id === Websocket.io.id) {
                myself = p1;
                enemy = p2;
            } else {
                myself = p2;
                enemy = p1;
            }

            if (myself.currentFocus > 0 && myself.finalSocialStanding > 0) {
                console.log("won");
            } else {
                console.log("lost");
            }

            scene.switch('OverWorldScene');
            Globals.data.combat = null;
        });

        this.createHudText(o);

    }

    renderActionText(text: string) {
        if(!this.dbox){
            this.dbox = new DialogBox(this);
            this.dbox._createWindow();
        }
        this.dbox.setText(text, false);
    }

    renderHudText(o: CombatWrapper){
        this.hudText.get('soc_standing'+o.attackerObject.id).text = o.attackerObject.finalSocialStanding.toString();
        this.hudText.get('soc_standing'+o.defenderObject.id).text =  o.defenderObject.finalSocialStanding.toString();
    }

    createHudText(o: CombatData){
        let leftSocialStanding = this.add.text(40, 40, o.combat.attackerObject.finalSocialStanding.toString(), {color: 'green', 'font-size': '45px'});
        let rightSocialStanding = this.add.text(this.game.renderer.width - 40, 40, o.combat.defenderObject.finalSocialStanding.toString(), {color: 'green', 'font-size': '45px'});

        this.hudText.set('soc_standing'+o.combat.attackerObject.id, leftSocialStanding);
        this.hudText.set('soc_standing'+o.combat.defenderObject.id, rightSocialStanding);
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }

}

import {Assets} from "../assets";
import {Constants} from "../constants";
import {Websocket} from "../websocket";
import {SharedConstants} from "../../shared/sharedConstants";
import {CombatWrapper} from "../combatWrapper";
import {
    AttackFile,
    createPlayerCombatFromStructure,
    PlayerCombat,
    The_Fool,
    The_Jailbait,
    The_Naughty_Nerd, The_Sexy_Samurai
} from "../../shared/playerCombat";
import {CombatData} from "../../shared/data";
import {DialogBox} from "../dialogbox";
import {Helper} from "./helper";
import SceneManager = Phaser.Scenes.SceneManager;

export class BattleScene extends Phaser.Scene {

    public meObject: PlayerCombat;
    public enemyObject: PlayerCombat;
    public lock: boolean;
    public text: Phaser.GameObjects.Text;
    public dbox: DialogBox;
    public hudText: Map<String, Phaser.GameObjects.Text>;
    private selection: Map<String, AttackFile>;
    private combat: CombatWrapper;
    constructor() {
        //TODO SET PLAYER OBJECTS
        super({
            key: "BattleScene"
        });
        this.hudText = new Map<String, Phaser.GameObjects.Text>();
        this.selection = new Map<String, AttackFile>();
    }

    preload(): void {
        this.load.image('bg', Assets.url('backgrounds', 'JM_Back_HS.png'));
        this.load.image(The_Fool.TYPE, Assets.url('characters', 'Fool Sketch.png'));
        this.load.image(The_Jailbait.TYPE, Assets.url('characters', 'Jailbait Sketch.png'));
        this.load.image(The_Naughty_Nerd.TYPE, Assets.url('characters', 'Naughty Nerd Sketch.png'));
        this.load.image(The_Sexy_Samurai.TYPE, Assets.url('characters', 'Zhe sexy samurai sketch.png'));
    }


    create(o: CombatData): void {
        this.combat=o.combat;
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

        let attackChooseText = "Choose attack:\n";
        let attacker = createPlayerCombatFromStructure(this.combat.attackerObject);
        this.selection = new Map<String, AttackFile>();
        this.renderAttackOptions(attacker, attackChooseText);

        this.input.keyboard.on("keydown_X", function (event) {
            console.log("x hit");
            //already press do nothing
            if (self.lock) {
                return;
            }
            self.renderAttackOptions( attacker, attackChooseText);
        });

        this.input.keyboard.on('keydown_A', function (event) {
            //already press do nothing
            if (self.lock) {
                return;
            }
            self.executeAttack("A");
        });
        this.input.keyboard.on('keydown_B', function (event) {
            //already press do nothing
            if (self.lock) {
                return;
            }
            self.executeAttack("B");
        });
        this.input.keyboard.on('keydown_C', function (event) {
            //already press do nothing
            if (self.lock) {
                return;
            }
            self.executeAttack("C");
        });
        this.input.keyboard.on('keydown_D', function (event) {
            //already press do nothing
            if (self.lock) {
                return;
            }
            self.executeAttack("D");
        });
        this.input.keyboard.on('keydown_E', function (event) {
            //already press do nothing
            if (self.lock) {
                return;
            }
            self.executeAttack("E");
        });



        Websocket.io.on(SharedConstants.EVENT_PLAYER_COMBATACTION, (p: CombatWrapper) => {
            console.log("Received combat event from server");
           let hitText= p.attackName+"\n";
            if(p.attackHit){
               hitText += "You have been hit by an enemy attack and your social standing is reduced by "+p.damageDealt+" points.";
           }else{
               hitText += "You have been missed by the enemy attack. Your social standing remains unchanged."
           }
            self.renderActionText(p.summaryString+"\n"+hitText+"\n Hit 'X' key to continue.");
            this.combat = p;
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

            this.switchToOverworld(this.game.scene);
            this.combat = null;
        });

        this.createHudText(o);


    }

    private renderAttackOptions( attacker, attackChooseText: string) {
        let options = ["A", "B", "C", "D", "E"];
        let myturn = this.combat.attackerObject.id === Websocket.io.id;
        if (myturn) {
            console.log("x hit and my turn");
            for (let i = 0; i < attacker.attacksAndSpells.length; i++) {
                let attackFile1 = attacker.attacksAndSpells[i];
                let disabledString = "";
                if (attackFile1.attackCost > attacker.currentFocus) {
                    disabledString = " (disabled)";
                    this.selection.set(options[i], null);
                } else {
                    this.selection.set(options[i], attackFile1);
                }
                attackChooseText += options[i] + ") " + attackFile1.name + " (" + attackFile1.attackCost + ")" + disabledString + " - " + attackFile1.descriptionOfAttack + "\n";
            }
            this.renderActionText(attackChooseText);

        } else {
            this.renderActionText("Wait for your opponents turn.");

        }
    }

    private executeAttack(a:string) {
        let myturn = this.combat.attackerObject.id === Websocket.io.id;
        if (myturn) {
            this.lock = true;
            console.log("was my turn switch now");

            let attackFile = this.selection.get(a);
            if(attackFile == null){//is disabled
                console.log("disabled!");
                return;
            }

            let p1 = createPlayerCombatFromStructure(this.combat.defenderObject);
            let p2 = createPlayerCombatFromStructure(this.combat.attackerObject);
            let combat: CombatWrapper = attackFile.combatFunction.call(p2, p1);//actual attack



            let summaryString = attackFile.dialogForAttack;
            let attackString = attackFile.name;
            combat.summaryString = attackFile.descriptionOfAttack;
            let def = combat.defenderObject;
            combat.defenderObject = combat.attackerObject ;
            combat.attackerObject = def;
            this.combat = combat;
            Websocket.io.emit(SharedConstants.EVENT_PLAYER_COMBATACTION, combat);
            console.log('send data will wait now');
            let hitText ="";
            if(combat.attackHit){
                hitText += "You have hit the enemy with an attack and her social standing is reduced by "+combat.damageDealt+" points.";
            }else{
                hitText += "You have missed the enemy. Her social standing remains unchanged."
            }
            this.renderActionText('Attack: ' + attackString + ' \n' + summaryString +'\n'+hitText+ ' \n\nWait for other turn now');
        } else {
            this.renderActionText('Its not your turn now');
        }
    }

    renderActionText(text: string) {
        if(!this.dbox){
            this.dbox = new DialogBox(this);
            this.dbox._createWindow();
        }
        console.log(text);
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

    private switchToOverworld(scene: SceneManager){
        Helper.resumeOverWorldScene(scene, 'BattleScene');
    }
}

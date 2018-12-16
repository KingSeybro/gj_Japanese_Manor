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

export class BattleSceneHelper {
    public combatWrap: CombatData;
    public globalSoundarray: Map<string, string[]>;

    constructor(combatWrap: CombatData, globalSoundarray: Map<string, string[]>) {
        this.combatWrap = combatWrap;
        this.globalSoundarray = globalSoundarray;
    }
}

export class BattleScene extends Phaser.Scene {

    public meObject: PlayerCombat;
    public enemyObject: PlayerCombat;
    public lock: boolean;
    public text: Phaser.GameObjects.Text;
    public dbox: DialogBox;
    public hudText: Map<String, Phaser.GameObjects.Text>;
    public hudBG: Map<String, Phaser.GameObjects.Graphics>;
    private selection: Map<String, AttackFile>;
    private combat: CombatWrapper;
    private globalsoundArray: Map<string, string[]>;

    constructor() {
        //TODO SET PLAYER OBJECTS
        super({
            key: "BattleScene"
        });
        this.hudText = new Map<String, Phaser.GameObjects.Text>();
        this.hudBG = new Map<String, Phaser.GameObjects.Graphics>();
        this.selection = new Map<String, AttackFile>();
    }

    preload(): void {
        this.load.image('bedroomBG', Assets.url('backgrounds','JM_Back_BR.png'));
        this.load.image('cherryblossomBG', Assets.url('backgrounds','JM_Back_CB.png'));
        this.load.image('diningroomBG', Assets.url('backgrounds','JM_Back_DR.png'));
        this.load.image('fountainBG', Assets.url('backgrounds','JM_Back_F.png'));
        this.load.image('hotspringBG', Assets.url('backgrounds','JM_Back_HS.png'));
        this.load.image('kitchenBG', Assets.url('backgrounds','JM_Back_Kit.png'));
        this.load.image('libraryBG', Assets.url('backgrounds','JM_Back_Lib.png'));
        this.load.image('luftschiffBG', Assets.url('backgrounds','JM_Back_LS.png'));
        this.load.image('salonBG', Assets.url('backgrounds','JM_Back_S.png'));


        this.load.image(The_Fool.TYPE, Assets.url('characters', 'Fool Sketch.png'));
        this.load.image(The_Jailbait.TYPE, Assets.url('characters', 'Jailbait Sketch.png'));
        this.load.image(The_Naughty_Nerd.TYPE, Assets.url('characters', 'Naughty Nerd Sketch.png'));
        this.load.image(The_Sexy_Samurai.TYPE, Assets.url('characters', 'Zhe sexy samurai sketch.png'));
    }


    create(battleSceneHelper: BattleSceneHelper): void {
        let o=battleSceneHelper.combatWrap;
        this.globalsoundArray = battleSceneHelper.globalSoundarray;
        this.combat=o.combat;

        switch (Math.floor(BattleScene.getBgDependingOnPos(o.otherPlayer.position))) {
            case 0:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'diningroomBG');
                break;
            case 1:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'fountainBG');
                break;
            case 2:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'hotspringBG');
                break;
            case 3:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'kitchenBG');
                break;
            case 4:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'libraryBG');
                break;
            case 5:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'luftschiffBG');
                break;
            case 6:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'bedroomBG');
                break;
            case 7:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'cherryblossomBG');
                break;
            default:
                this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'diningroomBG');
        }



        let face1 = this.add.sprite(this.game.renderer.width / 5 * 4, 500, o.combat.attackerObject.type);
        face1.displayWidth = 400;
        face1.scaleY = face1.scaleX;

        let face2 = this.add.sprite(this.game.renderer.width / 5 * 1, 500, o.combat.defenderObject.type);
        face2.displayWidth = 400;
        face2.scaleY = face2.scaleX;


        console.log("created battle screen");
        this.lock = false;
        let scene = this.scene;
        this.game.scene.dump();
        const self = this;

        let attackChooseText = "Choose attack:\n";
        let attacker = createPlayerCombatFromStructure(this.combat.attackerObject);
        this.selection = new Map<String, AttackFile>();
        this.renderAttackOptions(attacker, attackChooseText);

        this.input.keyboard.on("keydown_X", function (event) {
            console.log("x hit");
            //already press do nothing
            if (self.lock) {
                console.log('self.lock');
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
            attacker = createPlayerCombatFromStructure(p.attackerObject);
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
                this.lock = false;
                return;
            }


            

            let p1 = createPlayerCombatFromStructure(this.combat.defenderObject);
            let p2 = createPlayerCombatFromStructure(this.combat.attackerObject);
            let combat: CombatWrapper = attackFile.combatFunction.call(p2, p1);//actual attack

            //TODO: CALL RANDOM SOUND FILE
            switch (p2.type){
                case The_Fool.TYPE:
                    switch(Math.floor(1+Math.random()*3)) {
                        case 1:
                            this.sound.play(this.globalsoundArray.get("generalInsultsDaisy")[Math.floor(Math.random() * this.globalsoundArray.get("generalInsultsDaisy").length)]);
                            break;
                        case 2:
                            this.sound.play(this.globalsoundArray.get("complimentsDaisy")[Math.floor(Math.random() * this.globalsoundArray.get("complimentsDaisy").length)]);
                            break;
                        case 3:
                            this.sound.play(this.globalsoundArray.get("generalDefensiveDaisy")[Math.floor(Math.random() * this.globalsoundArray.get("generalDefensiveDaisy").length)]);
                            break;
                        case 4:
                            this.sound.play(this.globalsoundArray.get("exclamationDaisy")[Math.floor(Math.random() * this.globalsoundArray.get("exclamationDaisy").length)]);
                            break;
                    }
                break;
                case The_Sexy_Samurai.TYPE:
                    switch(Math.floor(1+Math.random()*3)) {
                        case 1:
                            this.sound.play(this.globalsoundArray.get("generalInsultsFranzi")[Math.floor(Math.random() * this.globalsoundArray.get("generalInsultsFranzi").length)]);
                            break;
                        case 2:
                            this.sound.play(this.globalsoundArray.get("complimentsFranzi")[Math.floor(Math.random() * this.globalsoundArray.get("complimentsFranzi").length)]);
                            break;
                        case 3:
                            this.sound.play(this.globalsoundArray.get("generalDefensiveFranzi")[Math.floor(Math.random() * this.globalsoundArray.get("generalDefensiveFranzi").length)]);
                            break;
                        case 4:
                            this.sound.play(this.globalsoundArray.get("exclamationFranzi")[Math.floor(Math.random() * this.globalsoundArray.get("exclamationFranzi").length)]);
                            break;
                    }
                    break;
                case The_Naughty_Nerd.TYPE:
                    switch(Math.floor(1+Math.random()*3)) {
                        case 1:
                            this.sound.play(this.globalsoundArray.get("generalInsultsKlara")[Math.floor(Math.random() * this.globalsoundArray.get("generalInsultsKlara").length)]);
                            break;
                        case 2:
                            this.sound.play(this.globalsoundArray.get("complimentsKlara")[Math.floor(Math.random() * this.globalsoundArray.get("complimentsKlara").length)]);
                            break;
                        case 3:
                            this.sound.play(this.globalsoundArray.get("generalDefensiveKlara")[Math.floor(Math.random() * this.globalsoundArray.get("generalDefensiveKlara").length)]);
                            break;
                        case 4:
                            this.sound.play(this.globalsoundArray.get("exclamationKlara")[Math.floor(Math.random() * this.globalsoundArray.get("exclamationKlara").length)]);
                            break;
                    }
                    break;
                case The_Jailbait.TYPE:
                    switch(Math.floor(1+Math.random()*2)) {
                        case 1:
                            this.sound.play(this.globalsoundArray.get("generalInsultsNanni")[Math.floor(Math.random() * this.globalsoundArray.get("generalInsultsNanni").length)]);
                            break;
                        case 2:
                            this.sound.play(this.globalsoundArray.get("complimentsNanni")[Math.floor(Math.random() * this.globalsoundArray.get("complimentsNanni").length)]);
                            break;
                        case 3:
                            this.sound.play(this.globalsoundArray.get("generalDefensiveNanni")[Math.floor(Math.random() * this.globalsoundArray.get("generalDefensiveNanni").length)]);
                            break;
                        case 4:
                            this.sound.play(this.globalsoundArray.get("exclamationNanni")[Math.floor(Math.random() * this.globalsoundArray.get("exclamationNanni").length)]);
                            break;
                    }
                    break;

            }

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
        this.dbox.setText(text, false);
    }


    renderHudText(o: CombatWrapper){
        this.hudText.get('soc_standing'+o.attackerObject.id).text = BattleScene.hudInfoText(o.attackerObject);
        this.hudText.get('soc_standing'+o.defenderObject.id).text = BattleScene.hudInfoText(o.defenderObject);
    }

    createHudText(o: CombatData) {
        let colorHud = 0x1e62ce;
        let alphaHud = 0.9;
        let leftBG = this.add.graphics();

        let leftSocialStanding = this.add.text(10, 10, BattleScene.hudInfoText(o.combat.attackerObject), {
            color: 'white',
            font: 'bold 14px Arial',
        });
        leftBG.fillStyle(colorHud, alphaHud);
        let withBox = 300;
        leftBG.fillRect(0, 0, withBox, 80);


        let rightBG = this.add.graphics();
        let rightX = this.game.renderer.width-withBox   ;
        let rightSocialStanding = this.add.text(rightX+10, 10, BattleScene.hudInfoText(o.combat.defenderObject), {
            color: 'white',
            font: 'bold 14px Arial',
        });
        rightBG.fillStyle(colorHud, alphaHud);
        rightBG.fillRect(rightX, 0, withBox, 80);


        this.hudText.set('soc_standing' + o.combat.attackerObject.id, leftSocialStanding);
        this.hudText.set('soc_standing' + o.combat.defenderObject.id, rightSocialStanding);
        this.hudBG.set('soc_standing' + o.combat.attackerObject.id, leftBG);
        this.hudBG.set('soc_standing' + o.combat.defenderObject.id, leftBG);
    }

    private static hudInfoText(points: PlayerCombat){
        return points.name +
            '\nSocial standing: ' + points.finalSocialStanding+'\n' +
            'Focus: '+points.currentFocus;
    }

    public static getBgDependingOnPos(pos){

        return Math.random()*9;
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }

    private switchToOverworld(scene: SceneManager){
        Helper.resumeOverWorldScene(scene, 'BattleScene');
    }
}

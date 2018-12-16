import {Assets} from "../assets";
import {Constants} from "../constants";
import {Conversation, ConversationNode} from "../converastion";
import {DialogBox} from "../dialogbox";
import {SceneHelper} from "./sceneHelper";
import {Websocket} from "../websocket";
import SceneManager = Phaser.Scenes.SceneManager;
import {Helper} from "./helper";
import {ItemFactory} from "../../shared/itemFactory";
import {Item} from "../../shared/item";

export class ConversationScene extends Phaser.Scene {
    private conv: Phaser.GameObjects.Text;
    private options: Phaser.GameObjects.Text;
    public node: ConversationNode;
    private conversation: Conversation;
    public dbox : DialogBox;
    private finished : boolean;
    public schelp : SceneHelper;
    private audio: any;


    constructor() {
        super({
            key: "ConversationScene"
        });
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

        this.load.audio('ButlerBad01', Assets.url('sound/Conversations', 'ButlerBad01.wav'));
        this.load.audio('ButlerBad02', Assets.url('sound/Conversations', 'ButlerBad02.wav'));
        this.load.audio('ButlerBadEnding', Assets.url('sound/Conversations', 'ButlerBadEnding.wav'));
        this.load.audio('ButlerGood01', Assets.url('sound/Conversations', 'ButlerGood01.wav'));
        this.load.audio('ButlerGood02', Assets.url('sound/Conversations', 'ButlerGood02.wav'));
        this.load.audio('ButlerGoodEnding', Assets.url('sound/Conversations', 'ButlerGoodEnding.wav'));
        this.load.audio('ButlerNeutral01', Assets.url('sound/Conversations', 'ButlerNeutral01.wav'));
        this.load.audio('ButlerNeutral02', Assets.url('sound/Conversations', 'ButlerNeutral02.wav'));
        this.load.audio('ButlerNeutralEnding', Assets.url('sound/Conversations', 'ButlerNeutralEnding.wav'));
        this.load.audio('GrafBad01', Assets.url('sound/Conversations', 'GrafBad01.wav'));
        this.load.audio('GrafBad02', Assets.url('sound/Conversations', 'GrafBad02.wav'));
        this.load.audio('GrafGood01', Assets.url('sound/Conversations', 'GrafGood01.wav'));
        this.load.audio('GrafGoodEnding', Assets.url('sound/Conversations', 'GrafGoodEnding.wav'));
        this.load.audio('GrafNeutral02', Assets.url('sound/Conversations', 'GrafNeutral02.wav'));
        this.load.audio('GrafNeutralEnding', Assets.url('sound/Conversations', 'GrafNeutralEnding.wav'));
        this.load.audio('MotherBad01', Assets.url('sound/Conversations', 'MotherBad01.wav'));
        this.load.audio('MotherBad02', Assets.url('sound/Conversations', 'MotherBad02.wav'));
        this.load.audio('MotherBadEnding', Assets.url('sound/Conversations', 'MotherBadEnding.wav'));
        this.load.audio('MotherGood01', Assets.url('sound/Conversations', 'MotherGood01.wav'));
        this.load.audio('MotherGood02', Assets.url('sound/Conversations', 'MotherGood02.wav'));
        this.load.audio('MotherGoodEnding', Assets.url('sound/Conversations', 'MotherGoodEnding.wav'));
        this.load.audio('MotherNeutral01', Assets.url('sound/Conversations', 'MotherNeutral01.wav'));
        this.load.audio('MotherNeutral02', Assets.url('sound/Conversations', 'MotherNeutral02.wav'));
        this.load.audio('MotherNeutralEnding', Assets.url('sound/Conversations', 'MotherNeutralEnding.wav'));
        this.load.audio('StartButler', Assets.url('sound/Conversations', 'StartButler.wav'));
        this.load.audio('StartGraf', Assets.url('sound/Conversations', 'StartGraf.wav'));
        this.load.audio('StartMother', Assets.url('sound/Conversations', 'StartMother.wav'));

        this.load.image('char_butler', Assets.url('characters','Butler Sketch.png'));
        this.load.image('char_mother', Assets.url('characters','Mother Sketch.png'));
        this.load.image('char_darcy', Assets.url('characters','Mr Darcy San Sketch.png'));

        this.load.image('char_jailbait', Assets.url('characters','Jailbait Sketch.png'));
        this.load.image('char_nerd', Assets.url('characters','Naughty Nerd Sketch.png'));
        this.load.image('char_samurai', Assets.url('characters','Zhe sexy samurai sketch.png'));
        this.load.image('char_fool', Assets.url('characters','Fool Sketch.png'));

        this.load.json('conversation_butler', Assets.url('conversations','ButlerConversation.json'));
        this.load.json('conversation_mother', Assets.url('conversations','MotherConversation.json'));
        this.load.json('conversation_darcy', Assets.url('conversations','GrafConversation.json'));

        this.finished = false;
    }

    create(sh:SceneHelper): void {
        console.log("created convo screen");
        this.schelp = sh;


        switch(sh._background){
            case 1: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'bedroomBG'); break;
            case 2: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'cherryblossomBG'); break;
            case 3: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'diningroomBG'); break;
            case 4: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'fountainBG'); break;
            case 5: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'hotspringBG'); break;
            case 6: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'kitchenBG'); break;
            case 7: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'libraryBG'); break;
            case 8: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'luftschiffBG'); break;
            case 9: this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'salonBG'); break;
        }

        let npcChar:any;
        switch(sh._char){
            case 1:  npcChar = this.add.sprite(this.game.renderer.width*(2/3), this.game.renderer.height*(3/5), "char_mother");
                     this.conversation = new Conversation(this.cache.json.get('conversation_mother'));
                     break;
            case 2:  npcChar = this.add.sprite(this.game.renderer.width*(2/3), this.game.renderer.height*(3/5), "char_butler");
                    this.conversation = new Conversation(this.cache.json.get('conversation_butler'));
                    break;
            case 3:  npcChar = this.add.sprite(this.game.renderer.width*(2/3), this.game.renderer.height*(3/5), "char_darcy");
                    this.conversation = new Conversation(this.cache.json.get('conversation_darcy'));
                    break;
        }

        //set the width of the sprite
        npcChar.displayWidth = 430;
        //scale evenly
        npcChar.scaleY = npcChar.scaleX;


        this.node = this.conversation.getNextNode();

        let scene = this.game.scene;
        let self=this;
        this.setConversationNode(this.conversation.getNextNode()); //initial node
        this.input.keyboard.on('keydown_A', eventHandler(self, scene));
        this.input.keyboard.on('keydown_B', eventHandler(self, scene));
        this.input.keyboard.on('keydown_C', eventHandler(self, scene));
    }

    private switchToOverworld(scene: SceneManager){
        Helper.resumeOverWorldScene(scene, 'ConversationScene');

    }

    setConversationNode(value: any) {
        this.node = value;
             let optionstext = "";
             let options = ["A","B","C","D"];

            //this.audio = new Audio(this.cache.audio.get(this.node.title));
            //this.audio = this.sound.add(this.cache.audio.get(this.node.title));

            this.sound.play(this.node.title);

             if(this.dbox!==undefined){
                 this.dbox.toggleWindow();
             }

        if(this.node.options.length==0){
            let itfa: ItemFactory = new ItemFactory();
            if(this.node.outcome==undefined){

            }
            else if(this.node.outcome==true){
                this.schelp._player.receiveItem(itfa.getRandomPositiveItem());
                console.log("Should have received a positive Item")
            }
            else{
                this.schelp._player.receiveItem(itfa.getRandomNegativeItem());
                console.log("Should have received a negative Item")

            }
            this.dbox._createCloseModalButton();
            this.finished = true;

        }
        else{
            for (let i = 0; i < this.node.options.length ; i++) {
                optionstext += options[i]+") "+this.node.options[i].text;
                optionstext += "\n\n";
            }
        }
        this.dbox = new DialogBox(this);
        this.dbox._createWindow();
        this.dbox.setText(""+this.node.text+"\n\n"+optionstext, false);
        this.dbox.dialog = ""+this.node.text+"\n"+optionstext;

    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}

function eventHandler(self, scene) {
    return function (event) {
        if(!self.finished) {
            self.setConversationNode(self.conversation.getNextNode(self.node.options[2].value));
        }
        else{
            self.switchToOverworld(scene)
        }
    }

}


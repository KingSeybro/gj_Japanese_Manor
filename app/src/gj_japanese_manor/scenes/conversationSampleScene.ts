import {Assets} from "../assets";
import {Constants} from "../constants";
import {Conversation, ConversationNode} from "../converastion";
import {DialogBox} from "../dialogbox";
import {SceneHelper} from "./sceneHelper";
import {Websocket} from "../websocket";
import SceneManager = Phaser.Scenes.SceneManager;

export class ConversationScene extends Phaser.Scene {
    private conv: Phaser.GameObjects.Text;
    private options: Phaser.GameObjects.Text;
    public node: ConversationNode;
    private conversation: Conversation;
    public dbox : DialogBox;
    private finished : boolean;


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


        this.load.image('char_butler', Assets.url('characters','Butler Sketch.png'));
        this.load.image('char_mother', Assets.url('characters','Mother Sketch.png'));
        this.load.image('char_darcy', Assets.url('characters','Mr Darcy San Sketch.png'));

        this.load.image('char_jailbait', Assets.url('characters','Jailbait Sketch.png'));
        this.load.image('char_nerd', Assets.url('characters','Naughty Nerd Sketch.png'));
        this.load.image('char_samurai', Assets.url('characters','Zhe sexy samurai Sketch.png'));
        this.load.image('char_fool', Assets.url('characters','Fool Sketch.png'));

        this.load.json('conversation_butler', Assets.url('conversations','ButlerConversation.json'));
        this.load.json('conversation_mother', Assets.url('conversations','MotherConversation.json'));
        this.load.json('conversation_darcy', Assets.url('conversations','GrafConversation.json'));

        this.finished = false;
    }

    create(sh:SceneHelper): void {
        console.log("created convo screen");


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
        this.input.keyboard.on('keydown_A', function (event) {
            if(!self.finished){
                self.setConversationNode(self.conversation.getNextNode(self.node.options[0].value));
            }
            else{
                self.switchToOverworld(scene)
            }
        });
        this.input.keyboard.on('keydown_B', function (event) {
            if(!self.finished){
                self.setConversationNode(self.conversation.getNextNode(self.node.options[1].value));
            } else{
                self.switchToOverworld(scene)
            }
        });
        this.input.keyboard.on('keydown_C', function (event) {
            if(!self.finished) {
                self.setConversationNode(self.conversation.getNextNode(self.node.options[2].value));
            }
            else{
                self.switchToOverworld(scene)
            }
            self.game.scene.dump();
        });
        this.input.keyboard.on('keydown_X', function (event) {
            if(self.finished!==true){
        }
        else {
                self.switchToOverworld(scene);
            }
        });
    }

    private switchToOverworld(scene: SceneManager){
        scene.resume('OverWorldScene');
        scene.stop("ConversationScene");
    }

    setConversationNode(value: any) {
        this.node = value;
             let optionstext = "";
             let options = ["A","B","C","D"];

             if(this.dbox!==undefined){
                 this.dbox.toggleWindow();
             }

        if(this.node.options.length==0){
            if(this.node.outcome==undefined){

            }
            else if(this.node.outcome==true){
                //TODO GIVE POSITIVE ITEM TO PLAYER (not yet here)
            }
            else{
                //TODO GIVE NEGATIVE ITEM TO PLAYER (not yet here)
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

import {Assets} from "../assets";
import {Constants} from "../constants";
import {Conversation, ConversationNode} from "../converastion";
import {DialogBox} from "../dialogbox";

export class ConversationScene extends Phaser.Scene {
    private conv: Phaser.GameObjects.Text;
    private options: Phaser.GameObjects.Text;
    public node: ConversationNode;
    private conversation: Conversation;
    public dbox : DialogBox;


    constructor() {
        super({
            key: "ConversationScene"
        });
    }

    preload(): void {

            this.load.image('bg_back_s', Assets.url('backgrounds','JM_Back_S.png'));
            this.load.image('jb_char', Assets.url('characters','Jailbait Sketch.png'));

            this.load.json('conversation', Assets.url('conversations','ButlerConversation.json'));
    }

    create(): void {
        console.log("created convo screen");
        this.conversation = new Conversation(this.cache.json.get('conversation'));
        this.node = this.conversation.getNextNode();
        // this.conv = this.add.text(16, 16, "", { fontSize: '40px', fill: '#FFFF' });
        // this.options = this.add.text(16, 64, "", { fontSize: '40px', fill: '#FFFF' });
        // this.addimage('bg_1');
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'bg_back_s');
        //let x = this.add.image(500,400,'jb_char',0.2);
        let face = this.add.sprite(this.game.renderer.width*(2/3), this.game.renderer.height*(3/5), "jb_char");
        //set the width of the sprite
        face.displayWidth = 430;
        //scale evenly
        face.scaleY = face.scaleX;
        let scene = this.scene;
        let self=this;
        this.setConversationNode(this.conversation.getNextNode()); //initial node
        this.input.keyboard.on('keydown_A', function (event) {
            self.setConversationNode(self.conversation.getNextNode(self.node.options[0].value));
        });
        this.input.keyboard.on('keydown_B', function (event) {
            self.setConversationNode(self.conversation.getNextNode(self.node.options[1].value));
        });
        this.input.keyboard.on('keydown_C', function (event) {
            self.setConversationNode(self.conversation.getNextNode(self.node.options[2].value));
        });
        this.input.keyboard.on('keydown_X', function (event) {
            scene.switch('OverWorldScene'); // Start the main scene
            scene.remove("ConversationScene");
        });
    }

    setConversationNode(value: any) {
        this.node = value;
        let options = ["A","B","C","D"];
        let optionstext = "";
        for (let i = 0; i < this.node.options.length ; i++) {
            optionstext += options[i]+") "+this.node.options[i].text;
            optionstext += "\n\n";
        }
        if(this.dbox!==undefined){
            this.dbox.toggleWindow();
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

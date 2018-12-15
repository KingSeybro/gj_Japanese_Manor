import {Assets} from "../assets";
import {Constants} from "../constants";
import {Conversation, ConversationNode} from "../converastion";

export class ConversationScene extends Phaser.Scene {
    private conv: Phaser.GameObjects.Text;
    private options: Phaser.GameObjects.Text;
    private node: ConversationNode;
    private conversation: Conversation;


    constructor() {
        super({
            key: "ConversationScene"
        });
    }

    preload(): void {
            this.load.json('conversation', Assets.url('conversations','TestConversation.json'));
    }

    create(): void {
        console.log("created battle screen");
        this.conversation = new Conversation(this.cache.json.get('conversation'));
        this.node = this.conversation.getNextNode();
        this.conv = this.add.text(16, 16, "", { fontSize: '18px', fill: '#FFFF' });
        this.options = this.add.text(16, 64, "", { fontSize: '18px', fill: '#FFFF' });


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
        this.conv.setText(this.node.text);
        this.options.setText(optionstext);
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}

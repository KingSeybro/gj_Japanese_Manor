import {Assets} from "../assets";
import {Constants} from "../constants";
import {DialogBox} from "../dialogbox";

export class DialogueScene extends Phaser.Scene {


    constructor() {
        super({
            key: "DialogueScene"
        });
    }

    preload(): void {
        this.load.plugin('DialogModalPlugin', './dialog_plugin.js');
    }

    create(): void {
        console.log("created dialogue screen");
        let scene = this.scene;
        this.input.keyboard.on('keydown_N', function (event) {
            scene.start('OverWorldScene'); // Start the main scene
        });
        // var dialogMessage = new Phaser.GameObjects.Text ();
        var text = "LAlalal"
        var opts = [

            text,
            this
        ]
        var b = new DialogBox(this);
        b.setText("blabla", false);
        b._createWindow();
        // // @ts-ignorxcvcxxye
        // console.log(game);
        //
        // // @ts-ignore
        // this.sys.install('DialogModalPlugin');
        // // @ts-ignore
        // console.log(this.sys.dialogModal);
        // // @ts-ignore
        // this.sys.dialogModal.init();
        // // @ts-ignore
        // this.sys.dialogModal.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', true);
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}
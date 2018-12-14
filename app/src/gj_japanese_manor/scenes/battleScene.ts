import {Assets} from "../assets";
import {Constants} from "../constants";

export class BattleScene extends Phaser.Scene {


    constructor() {
        super({
            key: "BattleScene"
        });
    }

    preload(): void {

    }

    create(): void {
        console.log("created battle screen");
        let scene = this.scene;
        this.input.keyboard.on('keydown_B', function (event) {
            console.log("now!");
            scene.start('OverWorldScene'); // Start the main scene
        });
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}

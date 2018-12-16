import {Assets} from "../assets";
import {Constants} from "../constants";
import BaseSound = Phaser.Sound.BaseSound;
import {SoundAssetGlobals} from "../soundAssetGlobals";
import {LoadingScene} from "./loadingScene";

export class SoundTemplate extends Phaser.Scene {

    constructor() {
        super({
            key: "SoundTemplate"
        });
    }

    preload(): void {
    }

    create(soundArray: Map<string, string[]>): void {
        console.log(soundArray);
        this.sound.play(soundArray.get("complimentsDaisy")[0]);

    }


    update(time: number, delta: number): void {
        super.update(time, delta);
        let cursors = this.input.keyboard.createCursorKeys();
        if(cursors.right.isDown) {
            this.sound.play('daisy1');
        }
        if(cursors.left.isDown) {
            this.sound.stopAll();
            this.sound.play('daisy3');
        }
    }


    initSounds(): void {

    }
}
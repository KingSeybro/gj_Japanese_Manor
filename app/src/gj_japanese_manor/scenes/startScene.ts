///<reference path="../../phaser.d.ts"/>
import {Assets} from "../assets";
import {Constants} from "../constants";
import {text} from "body-parser";

export class StartScene extends Phaser.Scene {


    constructor() {
        super({
            key: "StartScene"
        });
    }

    preload(): void {
        this.load.image('startBackground', 'assets/game/phaser.png');
        this.load.image('startBtn', 'assets/game/phaser.png');
        // how to use this?
        this.load.bitmapFont('Connection', 'assets/font/Connection.bmp');
        this.load.image('sexySamurai', 'assets/characters/Zhe sexy samurai Portrait sketch.png');
        this.load.image('naughtyNerd', 'assets/characters/Naughty Nerd Portrait Sketch.png');
        this.load.image('jailbait', 'assets/characters/Jailbait Portrait Sketch.png');
        this.load.image('fool', 'assets/characters/Fool Portrait Sketch.png');
    }

    create(): void {
        console.log("created start screen");
        let scene = this.scene;

        this.add.image(0, 0, 'startBackground').setOrigin(0, 0).setDepth(0);
        this.add.text((this.game.renderer.width / 2) - 200, this.game.renderer.height / 5, 'Japanese Manor', {
            fontSize: '50px',
            fill: '#f7f8f9'
        });
        let playButton = this.add.image(this.game.renderer.width / 2, 2 * this.game.renderer.height / 5, 'startBtn').setScale(0.5, 0.5);

        // let player1Btn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 5 + 100, 'startBtn').setScale(0.3, 0.3);
        // let player2Btn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 5 + 200, 'startBtn').setScale(0.3, 0.3);
        // let player3Btn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 5 + 300, 'startBtn').setScale(0.3, 0.3);
        // let player4Btn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 5 + 400, 'startBtn').setScale(0.3, 0.3);
        var anzahlPlayer = 4;
        let playerTextures = ['sexySamurai', 'naughtyNerd', 'jailbait', 'fool'];
        let playerArray = [];


        playButton.setVisible(false);
        playButton.setInteractive();

        for (var i = 0; i < anzahlPlayer; i++) {
            playerArray[i] = this.addPlayer(i, anzahlPlayer, playerTextures[i], 0.3, 0.3);
        }


        var clickedPlayerIndex = 0;
        for (let playerBtn of playerArray) {
            playerBtn.setInteractive();
            //choose Player + set StartButton visibility
            playerBtn.on("pointerup", () => {
                for (let players of playerArray) {
                    if (players != playerBtn) {
                        players.setVisible(!players.visible);
                    }
                }
                playButton.setVisible(!playButton.visible);
            });

        }


        playButton.on("pointerup", () => {
            var iter = 0;
            for (let player of playerArray) {
                if (player.visible) {
                    clickedPlayerIndex = iter;
                }
                iter = iter + 1;
            }
            var playerObjectClicked = new Object({
                number: clickedPlayerIndex,
                string: playerTextures[clickedPlayerIndex]
            });
            console.log("playbutton pressed");
            // you have to check if an Button beneath was chosen
            scene.start('OverWorldScene', playerObjectClicked);
        });
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }


    addPlayer(i, anzahlPlayer, texture, scaleX, scaleY) {
        return this.add.image((i + 1) * (this.game.renderer.width / (anzahlPlayer + 1)), 4 * this.game.renderer.height / 5, texture).setScale(scaleX, scaleY);
    }
}
///<reference path="../../phaser.d.ts"/>
import {The_Fool, The_Jailbait, The_Naughty_Nerd, The_Sexy_Samurai} from "../../shared/playerCombat";
import {SelectedPlayer} from "../selectedPlayer";

export class StartScene extends Phaser.Scene {
    private types: string[] = [The_Sexy_Samurai.TYPE, The_Naughty_Nerd.TYPE, The_Jailbait.TYPE, The_Fool.TYPE];


    constructor() {
        super({
            key: "StartScene"
        });
    }

    preload(): void {
        this.load.image('startBackground', 'assets/game/background_startscreen.png');
        this.load.image('startBtn', 'assets/game/start_button.png');
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

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'startBackground').setDepth(0);

        let playButton = this.add.image(this.game.renderer.width / 2, 2.2 * this.game.renderer.height / 5, 'startBtn').setScale(0.5, 0.5);

        // var anzahlPlayer = 4;
        let playerTextures = ['sexySamurai', 'naughtyNerd', 'jailbait', 'fool'];
        var anzahlPlayer = playerTextures.length;
        let playerArray = [];


        playButton.setVisible(false);
        playButton.setInteractive({useHandCursor: true});

        for (var i = 0; i < anzahlPlayer; i++) {
            playerArray[i] = this.addPlayer(i, anzahlPlayer, playerTextures[i], 2/anzahlPlayer, 2/anzahlPlayer);
        }


        var clickedPlayerIndex = 0;
        for (let playerBtn of playerArray) {
            playerBtn.setInteractive({useHandCursor: true});
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
            let playerObjectClicked = new SelectedPlayer(
                 clickedPlayerIndex,
                playerTextures[clickedPlayerIndex],
                this.types[clickedPlayerIndex]
            );
            console.log("playbutton pressed");

            // you have to check if an Button beneath was chosen
            this.game.scene.start('OverWorldScene', playerObjectClicked);
            this.game.scene.start('OverworldHudScene', playerObjectClicked);
            this.game.scene.stop('StartScene');
        });
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
    }


    addPlayer(i, anzahlPlayer, texture, scaleX, scaleY) {
        return this.add.image((i + 1) * (this.game.renderer.width / (anzahlPlayer + 1)), 4 * this.game.renderer.height / 5, texture).setScale(scaleX, scaleY);
    }
}
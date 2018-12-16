/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>

import "phaser";
import {OverWorldScene} from "./scenes/overWorldScene";
import {BattleScene} from "./scenes/battleScene";
import {StartScene} from "./scenes/startScene";
import {ConversationScene} from "./scenes/conversationSampleScene";
import {DialogueScene} from "./scenes/dialogueScene";
import {SoundTemplate} from "./scenes/soundTemplate";
import {LoadingScene} from "./scenes/loadingScene";
import {OverworldHudScene} from "./scenes/overworldHudScene";


// main game configuration
const config: GameConfig = {

    width: 1280,
    height: 720,

    type: Phaser.AUTO,
    pixelArt: false,
    parent: "game",

    scene: [LoadingScene, StartScene, OverWorldScene, OverworldHudScene, BattleScene, ConversationScene, DialogueScene, SoundTemplate],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0,},
        }
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    var game = new Game(config);
};

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


// main game configuration
const config: GameConfig = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    pixelArt: true,
    parent: "game",

    scene: [StartScene, OverWorldScene, BattleScene, ConversationScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0,},
            debug: true,
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

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>

import "phaser";
import {OverWorldScene} from "./scenes/overWorldScene";
import {BattleScene} from "./scenes/battleScene";

// main game configuration
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  pixelArt: true,
  parent: "game",
  scene: [OverWorldScene,BattleScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, }
      ,debug : true,
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

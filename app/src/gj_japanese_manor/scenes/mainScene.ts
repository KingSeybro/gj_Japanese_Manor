/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private moveKeys: object;
  private player: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image('player', './assets/boilerplate/player.png');
    this.physics.world.setBounds(0, 0, 9001, 9001);
  }
  

  create(): void {

    // Creates object for input with WASD kets
    this.moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setOrigin(0.5, 0.5).setDisplaySize(32, 32).setCollideWorldBounds(true).setDrag(500, 500);

    this.cameras.main.zoom = 1;
    const self = this;
    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
      self.player.setAccelerationY(-400);
    });
    this.input.keyboard.on('keydown_S', function (event) {
      self.player.setAccelerationY(400);
    });
    this.input.keyboard.on('keydown_A', function (event) {
      self.player.setAccelerationX(-400);
    });
    this.input.keyboard.on('keydown_D', function (event) {
      self.player.setAccelerationX(400);
    });
    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_W', function (event) {
      if (self.moveKeys['down'].isUp)
        self.player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
      if (self.moveKeys['up'].isUp)
        self.player.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
      if (self.moveKeys['right'].isUp)
        self.player.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
      if (self.moveKeys['left'].isUp)
        self.player.setAccelerationX(0);
    });
  }
  update (time, delta)
  {


    // Camera follows player ( can be set in create )
    this.cameras.main.startFollow(this.player);


  }

}

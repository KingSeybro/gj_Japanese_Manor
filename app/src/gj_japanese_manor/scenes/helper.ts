
export class Helper {

    public static switchToStartScreen(scene: Phaser.Scenes.SceneManager): void {
        scene.start('StartScene');

        scene.stop('OverWorldScene');
        scene.stop('ConversationScene');
        scene.stop('BattleScene');
    }
}
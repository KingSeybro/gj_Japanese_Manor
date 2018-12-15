
export class Helper {

    public static switchToStartScreen(scene: Phaser.Scenes.SceneManager): void {
        scene.start('StartScene');

        scene.stop('OverWorldScene');
        scene.stop('ConversationScene');
        scene.stop('BattleScene');
        scene.stop('DialogueScene');
        scene.dump();
    }

    public static resumeOverWorldScene(scene: Phaser.Scenes.SceneManager, currentSceneName: string) {
        scene.resume('OverWorldScene');
        scene.stop(currentSceneName);
    }
}
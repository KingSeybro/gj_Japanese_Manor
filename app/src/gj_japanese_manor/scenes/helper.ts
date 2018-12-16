
export class Helper {

    public static switchToStartScreen(scene: Phaser.Scenes.SceneManager): void {
        scene.start('StartScene');

        scene.stop('OverWorldScene')
        scene.stop('OverworldHudScene')
        scene.stop('ConversationScene');
        scene.stop('BattleScene');
        scene.stop('DialogueScene');
        scene.dump();
    }

    public static resumeOverWorldScene(scene: Phaser.Scenes.SceneManager, currentSceneName: string) {
        scene.wake('OverWorldScene');
        scene.wake('OverworldHudScene');
        scene.stop(currentSceneName);
    }

    public static switchFromWorldScreenTo(scene: Phaser.Scenes.SceneManager, newScene:string, o: any) {
        scene.start(newScene, o);
        scene.sleep('OverWorldScene');
        scene.sleep('OverworldHudScene');
    }
}
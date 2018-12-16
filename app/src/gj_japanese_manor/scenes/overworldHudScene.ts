import {ItemFactory} from "../../shared/itemFactory";
import {Assets} from "../assets";

export class OverworldHudScene extends Phaser.Scene {


    private items: Map<string, Phaser.GameObjects.Image>;

    constructor() {
        super({
            key: "OverworldHudScene"
        });
        this.items = new Map<string, Phaser.GameObjects.Image>();
    }

    preload(): void {
        console.log("Load "+ ItemFactory.getAllItems().length + " items as image");
        for (const item of ItemFactory.getAllItems()) {
            this.load.image("img" + item.id, Assets.url('items', item.imageID + '.png'));
        }

    }

    create(): void {
        for (const item of ItemFactory.getAllItems()) {
            let image = this.add.image(0, 0, 'img'+item.id);
            image.setScale(0.2);
            this.items.set(item.id, image);
        }
    }


    update(time: number, delta: number): void {
        super.update(time, delta);
        for (const itemKey of this.items.keys()) {
            let item = this.items.get(itemKey);
            item.setVisible(false);
        }

        let overWorldScene = this.scene.get('OverWorldScene');
        // @ts-ignore
        let selectedPlayer = overWorldScene.selectedPlayer;
        if(selectedPlayer) {
            let i = 0;
            let j = 0;
            for (const playerItem of selectedPlayer.items) {
                let playerItemImage = this.items.get(playerItem.id);
                playerItemImage.setX(40 + j*80);
                playerItemImage.setY(40 + i*80);
                playerItemImage.setVisible(true);
                i++;
                if(j != 0 && j % 8 == 0){
                    j++;
                }
            }
        } else {
            console.log('undefined')
        }

    }
}
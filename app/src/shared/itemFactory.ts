import {Item} from "./item";

export class ItemFactory {

    public itemArrayPositive: Item[];
    public itemArrayNegative: Item[];


    constructor() {
        this.itemArrayPositive.push(new Item("Tea Set of the forgotten Monk", 1, "", 2, 0, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Fan of the Imperial Concubine", 2, "", 2, 0, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Hakama of the lost sword Saint", 3, "", 2, 0, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Indomitable Haircomb of the Lotus", 4, "", 0, 2, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Riding Crop of the Lone Star Marshall", 5, "", 0, 2, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Jade Seal of the first Emperor", 6, "", 0, 0, 2, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Lustrous Perfume of hte Sun +1", 7, "", 0, 0, 0, 2, 0, 0));
        this.itemArrayPositive.push(new Item("Silken Scarf of hidden Secrets", 8, "", 0, 0, 0, 2, 0, 0));
        this.itemArrayPositive.push(new Item("Ancient Scroll of the Air Kami", 9, "", 0, 0, 0, 2, 0, 0));
        this.itemArrayPositive.push(new Item("Consecrated Incense of the Dragon", 10, "", 0, 0, 0, 0, 16, 0));
        this.itemArrayPositive.push(new Item("Fragrant candle of the Honeydew", 11, "", 0, 0, 0, 0, 16, 0));
        this.itemArrayPositive.push(new Item("Delicious Dango of Northern Stars", 12, "", 0, 0, 0, 0, 0, 2));
        this.itemArrayPositive.push(new Item("Seductive Slipper of Sacre Bleu", 13, "", 0, 0, 0, 0, 0, 2));
        this.itemArrayPositive.push(new Item("Mighty Mochi of the merciful godess", 14, "", 0, 0, 2, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Sanctified sake set of the Monkey King", 15, "", 0, 0, 2, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Bamboo Brush of the beauty fountain", 16, "", 0, 0, 2, 0, 0, 0));

        this.itemArrayNegative.push(new Item("Shameful Reproach", 17, "", -2, 0, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 18, "", -2, 0, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 19, "", -2, 0, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 20, "", 0, -2, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 21, "", 0, -2, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 22, "", 0, 0, -2, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 23, "", 0, 0, 0, 2, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 24, "", 0, 0, 0, 2, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 25, "", 0, 0, 0, 2, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 26, "", 0, 0, 0, 0, -6, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 27, "", 0, 0, 0, 0, -6, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 28, "", 0, 0, 0, 0, 0, -1));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 29, "", 0, 0, 0, 0, 0, -1));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 30, "", 0, 0, -2, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 31, "", 0, 0, -2, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", 32, "", 0, 0, -2, 0, 0, 0));


    }

    public getRandomPositiveItem(): Item {
        let randomInt: number = 1 + Math.floor(Math.random() * 6);
        return this.itemArrayPositive[randomInt];
    }

    public getRandomNegativeItem(): Item {
        let randomInt: number = 1 + Math.floor(Math.random() * 6);
        return this.itemArrayNegative[randomInt];
    }

}
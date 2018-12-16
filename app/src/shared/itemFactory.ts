import {Item} from "./item";

export class ItemFactory {

    public itemArrayPositive: Item[];
    public itemArrayNegative: Item[];


    constructor() {
        this.itemArrayNegative = [];
        this.itemArrayPositive = [];


        this.itemArrayPositive.push(new Item("Tea Set of the forgotten Monk", "1", "teaset", 2, 0, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Fan of the Imperial Concubine", "2", "fan", 2, 0, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Hakama of the lost sword Saint", "3", "hakama", 2, 0, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Indomitable Haircomb of the Lotus", "4", "haircomb", 0, 2, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Riding Crop of the Lone Star Marshall", "5", "riding crop", 0, 2, 0, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Jade Seal of the first Emperor", "6", "jade seal", 0, 0, 2, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Lustrous Perfume of hte Sun +1", "7", "perfume", 0, 0, 0, 2, 0, 0));
        this.itemArrayPositive.push(new Item("Silken Scarf of hidden Secrets", "8", "scarf", 0, 0, 0, 2, 0, 0));
        this.itemArrayPositive.push(new Item("Ancient Scroll of the Air Kami", "9", "scroll", 0, 0, 0, 2, 0, 0));
        this.itemArrayPositive.push(new Item("Consecrated Incense of the Dragon", "10", "incense", 0, 0, 0, 0, 16, 0));
        this.itemArrayPositive.push(new Item("Fragrant candle of the Honeydew", "11", "candle", 0, 0, 0, 0, 16, 0));
        this.itemArrayPositive.push(new Item("Delicious Dango of Northern Stars", "12", "dango", 0, 0, 0, 0, 0, 2));
        this.itemArrayPositive.push(new Item("Seductive Slipper of Sacre Bleu", "13", "slippers", 0, 0, 0, 0, 0, 2));
        this.itemArrayPositive.push(new Item("Mighty Mochi of the merciful godess", "14", "mochi", 0, 0, 2, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Sanctified sake set of the Monkey King", "15", "sake set", 0, 0, 2, 0, 0, 0));
        this.itemArrayPositive.push(new Item("Bamboo Brush of the beauty fountain", "16", "brush", 0, 0, 2, 0, 0, 0));

        this.itemArrayNegative.push(new Item("Shameful Reproach", "17", "badrep", -2, 0, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "18", "badrep", -2, 0, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "19", "badrep", -2, 0, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "20", "badrep", 0, -2, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "21", "badrep", 0, -2, 0, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "22", "badrep", 0, 0, -2, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "23", "badrep", 0, 0, 0, 2, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "24", "badrep", 0, 0, 0, 2, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "25", "badrep", 0, 0, 0, 2, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "26", "badrep", 0, 0, 0, 0, -6, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "27", "badrep", 0, 0, 0, 0, -6, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "28", "badrep", 0, 0, 0, 0, 0, -1));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "29", "badrep", 0, 0, 0, 0, 0, -1));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "30", "badrep", 0, 0, -2, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "31", "badrep", 0, 0, -2, 0, 0, 0));
        this.itemArrayNegative.push(new Item("Shameful Reproach", "32", "badrep", 0, 0, -2, 0, 0, 0));


    }

    public getRandomPositiveItem(): Item {
        let randomInt: number = 1 + Math.floor(Math.random() * 6);
        return this.itemArrayPositive[randomInt];
    }

    public getRandomNegativeItem(): Item {
        let randomInt: number = 1 + Math.floor(Math.random() * 6);
        return this.itemArrayNegative[randomInt];
    }


    public static getAllItems(): Item[] {
        let factory = new ItemFactory();
        let items = [];
        for (const item of factory.itemArrayNegative) {
            items.push(item);
        }
        for (const item of factory.itemArrayPositive) {
            items.push(item);
        }
        return items;

    }
}
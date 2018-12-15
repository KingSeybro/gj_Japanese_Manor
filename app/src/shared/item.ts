export class Item{

    public name: string;
    public imageID: string;
    public id: string;
    public defMod: number;
    public armMod: number;
    public damageMod: number;
    public attackMod: number;
    public socialMod: number;
    public focusMod: number;


    constructor(name: string, id: string, imageID: string, defMod: number, armMod: number, damageMod: number, attackMod: number, socialMod: number, focusMod: number) {
        this.name = name;
        this.id = id;
        this.imageID = imageID;
        this.defMod = defMod;
        this.armMod = armMod;
        this.damageMod = damageMod;
        this.attackMod = attackMod;
        this.socialMod = socialMod;
        this.focusMod = focusMod;
    }


}
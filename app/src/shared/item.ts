export class Item{

    public name: String;
    public id: String;
    public defMod: Number;
    public armMod: Number;
    public damageMod: Number;
    public attackMod: Number;
    public socialMod: Number;
    public focusMod: Number;


    constructor(name: String, id: String, defMod: Number, armMod: Number, damageMod: Number, attackMod: Number, socialMod: Number, focusMod: Number) {
        this.name = name;
        this.id = id;
        this.defMod = defMod;
        this.armMod = armMod;
        this.damageMod = damageMod;
        this.attackMod = attackMod;
        this.socialMod = socialMod;
        this.focusMod = focusMod;
    }
}
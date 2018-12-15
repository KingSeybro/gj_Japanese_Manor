import {Item} from "./item";
import {CombatWrapper} from "../gj_japanese_manor/combatWrapper";

export class PlayerCombat {

    public ultimateAttackIsEnabled: boolean = false;

    public attacksAndSpells: AttackFile[];
    //Name to be Displayed
    public name: string;
    //Unique ID
    public id: string;
    //Defensive Value between 10-14
    public def: number;
    //Defensive Value inlcuding Modifiers
    public finalDef: number;
    //Armor Value between 14-18
    public arm: number;
    //Armor Value including Modifiers
    public finalArm: number;
    //Damage Inflicted by Character ranges between 10-14
    public damageDone: number;
    //Damage Value including Modifiers
    public finalDamageDone: number;
    //Attack Value used to hit, ranges between 5-7
    public attack: number;
    //Attack Value including Modifiers
    public finalAttack: number;
    //SocialStanding aka Healthpoints ranging from 14-20
    public socialStanding: number;
    //SocialStanding including Modifiers
    public finalSocialStanding: number;
    //Focus aka ActionPoints ranging from 6-8
    public focus: number;
    //Focus including Modifiers
    public finalFocus: number;
    //CurrentFocus that is refilled to maximum focus at the beginning of each round
    public currentFocus: number;
    //Items and Boni carried
    public items: Item[];
    // type of object
    public type: string;


    constructor(name: string, id: string, def: number, arm: number, damageDone: number, attack: number, socialStanding: number, focus: number, type: string) {
        this.name = name;
        this.id = id;
        this.def = def;
        this.finalDef = def;
        this.arm = arm;
        this.finalArm = arm;
        this.damageDone = damageDone;
        this.finalDamageDone = damageDone;
        this.attack = attack;
        this.finalAttack = attack;
        this.socialStanding = socialStanding;
        this.finalSocialStanding = socialStanding;
        this.finalFocus = focus;
        this.currentFocus = focus;
        this.attacksAndSpells = []
        this.items = []
        this.type = type;
    }

   public returnCombatWrapper(passing: Function, enemyPlayer: PlayerCombat): CombatWrapper {
       let attackSummary:string;
       let attackname:string;

       for (let i=0; i < this.attacksAndSpells.length;i++){
           if (this.attacksAndSpells[i].combatFunction == passing){
               attackSummary = this.attacksAndSpells[i].descriptionOfAttack;
               attackname = this.attacksAndSpells[i].name;
           }
       }

       return new CombatWrapper(this, enemyPlayer,attackSummary, attackname);

   }

    public basicAttack(enemyPlayer: PlayerCombat): CombatWrapper {
        let focusCost: number = 1;
        //Player rolls 2d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 2d6 - ARM = damage done to Social Standing
        var attackRoll: number = this.diceRolling(2);
        var finalDamageDone: number = 0;
        if (attackRoll + this.finalAttack >= enemyPlayer.finalDef) {
            var damageRoll: number = this.diceRolling(2);
            if (damageRoll + this.finalDamageDone > enemyPlayer.finalArm) {
                enemyPlayer.finalSocialStanding = this.finalSocialStanding - (damageRoll + this.finalDamageDone - enemyPlayer.finalArm);
                finalDamageDone = (damageRoll + this.finalDamageDone - enemyPlayer.finalArm);
            } else {
                //NO Damage is DONE
            }
        } else {
            //The ENEMY IS MISSED
        }
        this.currentFocus = this.currentFocus - focusCost;

        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.basicAttack, enemyPlayer);

    }

    //Addition 1D6 for hitting
    public accurateAttack(enemyPlayer: PlayerCombat): CombatWrapper {
        let focusCost: number = 2;
        //Player rolls 3d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 2d6 - ARM = damage done to Social Standing
        var attackRoll: number = this.diceRolling(3);
        if (attackRoll + this.finalAttack >= enemyPlayer.finalDef) {
            var damageRoll: number = this.diceRolling(2);
            if (damageRoll + this.finalDamageDone > enemyPlayer.finalArm) {
                enemyPlayer.finalSocialStanding = this.finalSocialStanding - (damageRoll + this.finalDamageDone - enemyPlayer.finalArm);
            } else {
                //NO Damage is DONE
            }
        } else {
            //The ENEMY IS MISSED
        }
        this.currentFocus = this.currentFocus - focusCost;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.accurateAttack, enemyPlayer);

    }

    //Additional 1d6 for Damage
    public powerfulAttack(enemyPlayer: PlayerCombat): CombatWrapper {
        let focusCost: number = 2;
        //Player rolls 2d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 3d6 - ARM = damage done to Social Standing
        let attackRoll: number = this.diceRolling(2);
        if (attackRoll + this.finalAttack >= enemyPlayer.finalDef) {
            let damageRoll: number = this.diceRolling(3);
            if (damageRoll + this.finalDamageDone > enemyPlayer.finalArm) {
                enemyPlayer.finalSocialStanding = this.finalSocialStanding - (damageRoll + this.finalDamageDone - enemyPlayer.finalArm);
            } else {
                //NO Damage is DONE
            }
        } else {
            //The ENEMY IS MISSED
        }
        this.currentFocus = this.currentFocus - focusCost;

        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.powerfulAttack, enemyPlayer);


    }

    // Additional 1d6 for hitting and for damage
    public combinedAttack(enemyPlayer: PlayerCombat): CombatWrapper {
        let focusCost: number = 3;
        //Player rolls 3d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 3d6 - ARM = damage done to Social Standing
        let attackRoll: number = this.diceRolling(2);
        if (attackRoll + this.finalAttack >= enemyPlayer.finalDef) {
            let damageRoll: number = this.diceRolling(2);
            if (damageRoll + this.finalDamageDone > enemyPlayer.finalArm) {
                enemyPlayer.finalSocialStanding = this.finalSocialStanding - (damageRoll + this.finalDamageDone - enemyPlayer.finalArm);
            } else {
                //NO Damage is DONE
            }
        } else {
            //The ENEMY IS MISSED
        }
        this.currentFocus = this.currentFocus - focusCost;

        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.combinedAttack, enemyPlayer);
    }

    //Call this after the END of each Combat
    public endOfCombatHouseKeeping(){
        this.finalDef = this.def;
        this.finalArm = this.arm;
        this.finalDamageDone = this.damageDone;
        this.finalAttack = this.attack;
        this.finalFocus = this.focus;
        for (let i = 0; i < this.items.length; i++) {
            this.finalDef = this.finalDef + this.items[i].defMod;
            this.finalArm = this.finalArm + this.items[i].armMod;
            this.finalDamageDone = this.finalDamageDone + this.items[i].damageMod;
            this.finalAttack = this.finalAttack + this.items[i].attackMod;
            this.finalFocus = this.finalFocus + this.items[i].focusMod;
        }
    }


    //Call this after you receive an ITEM
    public receiveItem(itemReceived: Item){
        this.items.push(itemReceived);
        this.finalFocus = this.finalFocus + itemReceived.focusMod;
        this.finalDef = this.finalDef + itemReceived.defMod;
        this.finalArm = this.finalArm + itemReceived.armMod;
        this.finalSocialStanding = this.finalSocialStanding + itemReceived.socialMod;
        this.finalAttack = this.finalAttack + itemReceived.attackMod;
        this.finalDamageDone = this.finalDamageDone + itemReceived.damageMod;
    }


    public diceRolling(numberofDice: number): number {

        let rollResult: number = 0;

        for (let i = 0; i < numberofDice; i++) {
            rollResult = rollResult + 1 + Math.floor(Math.random() * 6);

        }
        return rollResult;
    }

}

export class The_Fool extends PlayerCombat{

    public static readonly TYPE = "The_Fool";

    constructor(id: string) {
        super("Daisy Washington III Esq.", id, 12, 19, 11, 6, 16, 6, The_Fool.TYPE);
        this.attacksAndSpells.push(new AttackFile("Faux Pas", this.basicAttack, "A basic attack", "Oh, I’m terribly sorry for spoiling your ensemble." ));
        this.attacksAndSpells.push(new AttackFile("Honorable Gent", this.powerfulAttack, "A powerful attack dealing more damage", "Reginald, please take care of this goose”; Reginald: “I is honored m’lady"));
        this.attacksAndSpells.push(new AttackFile("Most Powerful Southern Bloodline!", this.combinedAttack, "An expensive attack that is both powerful and accurate", ""));
        this.attacksAndSpells.push(new AttackFile("Swoon", this.debuffArmSpell, "Daisy disarms her opponent with her charm and reduces their Armor.", "I feel featherbrained – thank ye for catchin’ me, doll" ));
        this.attacksAndSpells.push(new AttackFile("Monkey Army", this.ultimateAttack, "Daisy unleashes her Army of Monkeys from the Bathhouse", "Let’s see how y’all like my spirit animal."));
    }


    //DeBuffspell that gives the Opponent -2 ARM for the Combat
    public debuffArmSpell(enemyPlayer: PlayerCombat): CombatWrapper{
        let focusCost: number = 2;
        enemyPlayer.finalArm = enemyPlayer.finalArm-2;
        this.currentFocus = this.currentFocus - focusCost;

        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.debuffArmSpell, enemyPlayer);
    }

    //Multiple Basic Attacks randomized between 3-6
    public ultimateAttack(enemyPlayer: PlayerCombat): CombatWrapper {
       let amountsofAttacks: Number = 3 + Math.floor(Math.random() * 6);

       for (let i=0; i <= amountsofAttacks; i++){
           this.basicAttack(enemyPlayer);
           this.currentFocus = this.currentFocus + 1;
       }

        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.ultimateAttack, enemyPlayer);
    }
}

export class The_Jailbait extends PlayerCombat{

    public static readonly TYPE = "The_Jailbait";

    constructor(id: string) {
        super("Nanni Spielmänner", id, 13, 14, 12, 6, 18, 8, The_Jailbait.TYPE);
        this.attacksAndSpells.push(new AttackFile("Hex of Frailty", this.basicAttack, "A basic spell", "Are you aware of your body’s process of decomposition." ));
        this.attacksAndSpells.push(new AttackFile("Curse of Despair", this.fixedDamageSpell, "A curse that deals fixed damage", "See that doll I made? It looks just like you."));
        this.attacksAndSpells.push(new AttackFile("Obsidian Curse of the Butterfly", this.debuffArmSpell, "A spell that reduces your opponents Armor", "I felt a butterfly flap its wings in Argentina. The Doom of Damocles hangs over you now!"));
        this.attacksAndSpells.push(new AttackFile("Aegis of the Oni", this.debuffArmSpell, "Nanni calls upon the Oni to increase her Defense and Armor", "The Oni protect us!" ));
        this.attacksAndSpells.push(new AttackFile("Tempest of the Last Witch of Azabu ", this.ultimateAttack, "Calling upon her Ultimate Power Nanni reveals her true self!", "Tremble before the power of the last Witch, as my power saps your strength!"));
    }

    //this is a powerful spell, that does fixed damage
    public fixedDamageSpell(enemyPlayer: PlayerCombat): CombatWrapper{
        let focusCost: number= 3;
        enemyPlayer.socialStanding = enemyPlayer.socialStanding - 3 - (this.finalDamageDone - this.damageDone);
        this.currentFocus = this.currentFocus - focusCost;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.fixedDamageSpell, enemyPlayer);
    }

    //DeBuffspell that gives the Opponent -2 ARM for the Combat
    public debuffArmSpell(enemyPlayer: PlayerCombat): CombatWrapper{
        let focusCost: number = 2;
        enemyPlayer.finalArm = enemyPlayer.finalArm-2;
        this.currentFocus = this.currentFocus - focusCost;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.debuffArmSpell, enemyPlayer);
    }
    // Nanni reduces the the current focus by 3, reduces permanent focus by 1 and casts her fixed damage spell for free!
    public ultimateAttack(enemyPlayer: PlayerCombat): CombatWrapper{
        if (enemyPlayer.currentFocus > 3) {
            enemyPlayer.currentFocus = enemyPlayer.currentFocus-3
        } else {
            enemyPlayer.currentFocus = 0;
        }
        enemyPlayer.finalFocus = enemyPlayer.finalFocus-1;
        this.fixedDamageSpell(enemyPlayer);
        this.currentFocus = this.currentFocus+3;

        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.ultimateAttack, enemyPlayer);

    }
}

export class The_Naughty_Nerd extends PlayerCombat {

    public static readonly TYPE = "The_Naughty_Nerd";

    constructor(id: string) {
        super("Klaranette Zeitung", id, 16, 16, 11, 6, 14, 7, The_Naughty_Nerd.TYPE);
        this.attacksAndSpells.push(new AttackFile("Hushed Rumor", this.basicAttack, "A basic rumor", "Have you heard what the Graf’s mother said about you?"));
        this.attacksAndSpells.push(new AttackFile("Sticks and Stones...", this.accurateAttack, "An accurate scathing retort.", "... may break my bones, but chains and whips excite me!"));
        this.attacksAndSpells.push(new AttackFile("Shroud of Haiku", this.defBuffSpell, "Hidden behind weaves of knowledge and words, Kalaranette raises her Defense", "“You and Ben Franklin – share some similarities – namely syphilis.” \n" +
            "“Early in the day – right when dawn kisses the sky – you should give me tongue.” \n" +
            "“I’m a lusty wench – put your hand up my skirt and – pinch my bottom, hoss.” \n"));
        this.attacksAndSpells.push(new AttackFile("Uncanny Knowledge", this.damageBuffSpell, "Words are weapons in the right hands, gain additional damage", "Don’t you know the secret of life? … 42!"));
        this.attacksAndSpells.push(new AttackFile("Seven Seals Unleashed", this.ultimateAttack, "Kalaranette breaks the last seal and reveals her book's true knowledge!", "-"));
    }

    //this is a dot spell, fixed damage for a few rounds


    public damageBuffSpell(enemyPlayer: PlayerCombat): CombatWrapper {
        let focusCost: number = 2;
        this.finalDamageDone = this.finalDamageDone + 2;
        this.currentFocus = this.currentFocus - focusCost;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.damageBuffSpell, enemyPlayer);
    }


    //DefenseBuffSpell
    public defBuffSpell(enemyPlayer: PlayerCombat): CombatWrapper {
        let focusCost: number = 2;
        this.finalDef = this.finalDef + 2;
        this.currentFocus = this.currentFocus - focusCost;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.defBuffSpell, enemyPlayer);
    }

    //Klaranette reduces her current health by half but deals half her health +2 to the enemy!
    public ultimateAttack(enemyPlayer: PlayerCombat): CombatWrapper {
            this.socialStanding = this.socialStanding / 2;
            enemyPlayer.finalSocialStanding = this.socialStanding+2;
            this.finalSocialStanding = this.socialStanding;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.ultimateAttack, enemyPlayer);
    }
}

export class The_Sexy_Samurai extends PlayerCombat {

    public static readonly TYPE = "The_Sexy_Samurai";

    constructor(id: string) {
        super("Franziska Schneiden Von Solingens", id, 15, 18, 13, 8, 14, 6, The_Sexy_Samurai.TYPE);
        this.attacksAndSpells.push(new AttackFile("Flying Sparrow", this.basicAttack, "A basic attack", "Swift justice!"));
        this.attacksAndSpells.push(new AttackFile("Iron Cross Slash of Blossoms", this.accurateAttack, "A accurate cross slash", "See how you’ll look with a slashed kimono."));
        this.attacksAndSpells.push(new AttackFile("Blood and Iron", this.powerfulAttack, "A powerful attack, invoking the spirit of Bismarck", "Now you wear the mark of Schneiden Von Solingens upon your SOUL!"));
        this.attacksAndSpells.push(new AttackFile("Tempest of Blazing Fury", this.combinedAttack, "Unleashing a torrent of blades Franziska ruffles the feathers of her opponents with this powerful and accurate attack.", "This will blow you away!"));
        this.attacksAndSpells.push(new AttackFile("Panzerkampfwagen VI Tiger", this.ultimateAttack, "Calling upon her German Spirit Animal she summons a Panzerkampfwagen Tiger I and takes on its abilities!", "You’re fired"));
    }

    //She takes on the Ability of her Spirit Animal the Panzerkampfwagen and gains additional permanent Armor and attacks her powerful attack twice!
    public ultimateAttack(enemyPlayer: PlayerCombat): CombatWrapper {
        this.finalArm = this.finalArm+2;
        this.arm = this.arm+2;
        this.combinedAttack(enemyPlayer);
        this.currentFocus = this.currentFocus+3;
        //TODO: FOR VEIT
        return this.returnCombatWrapper(this.ultimateAttack, enemyPlayer);
    }
}

/**
 * Converts a json object to an instance of a player combat object
 * this is necessary as we only can transfer json objects without functions
 *
 * @param obj - obj received via the wire
 * @returns {PlayerCombat} instance out of the json obj
 */
export function createPlayerCombatFromStructure(obj: any): PlayerCombat {
    let instance = null;
    switch (obj.type) {
        case The_Fool.TYPE:
            instance = new The_Fool(obj.id);
            break;
        case The_Jailbait.TYPE:
            instance = new The_Jailbait(obj.id);
            break;
        case The_Naughty_Nerd.TYPE:
            instance = new The_Naughty_Nerd(obj.id);
            break;
        case The_Sexy_Samurai.TYPE:
            instance = new The_Sexy_Samurai(obj.id);
            break;
        default:
            console.log('could not read property type')
    }
    for (let k in obj) instance[k] = obj[k];
    return instance;
}



    export class AttackFile{

    public name: string;
    public combatFunction: Function;
    public descriptionOfAttack: string;
    public dialogForAttack: string;

    constructor(name: string, combatFunction: Function, descriptionOfAttack: string, dialogForAttack: string) {
        this.name = name;
        this.combatFunction = combatFunction;
        this.descriptionOfAttack = descriptionOfAttack;
        this.dialogForAttack = dialogForAttack;
    }
}
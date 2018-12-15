import {Item} from "./item";

export class PlayerCombat {

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


    constructor(name: string, id: string, def: number, arm: number, damageDone: number, attack: number, socialStanding: number, focus: number) {
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
    }

    public basicAttack(enemyPlayer: PlayerCombat): void {
        let focusCost: number = 1;
        //Player rolls 2d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 2d6 - ARM = damage done to Social Standing
        var attackRoll: number = this.diceRolling(2);
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
    }

    //Addition 1D6 for hitting
    public accurateAttack(enemyPlayer: PlayerCombat): void {
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
    }

    //Additional 1d6 for Damage
    public powerfulAttack(enemyPlayer: PlayerCombat): void {
        let focusCost: number = 2;
        //Player rolls 2d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 3d6 - ARM = damage done to Social Standing
        var attackRoll: number = this.diceRolling(2);
        if (attackRoll + this.finalAttack >= enemyPlayer.finalDef) {
            var damageRoll: number = this.diceRolling(3);
            if (damageRoll + this.finalDamageDone > enemyPlayer.finalArm) {
                enemyPlayer.finalSocialStanding = this.finalSocialStanding - (damageRoll + this.finalDamageDone - enemyPlayer.finalArm);
            } else {
                //NO Damage is DONE
            }
        } else {
            //The ENEMY IS MISSED
        }
        this.currentFocus = this.currentFocus - focusCost;
    }

    // Additional 1d6 for hitting and for damage
    public combinedAttack(enemyPlayer: PlayerCombat): void {
        let focusCost: number = 3;
        //Player rolls 3d6 + attack vs Defensive Value
        // if ATK Roll > Defensive Roll = Hit
        // finalDamageDone + 3d6 - ARM = damage done to Social Standing
        var attackRoll: number = this.diceRolling(2);
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
    }


    public receiveItem(itemReceived: Item) {
        this.items.push(itemReceived);
        this.finalFocus = this.finalFocus + itemReceived.focusMod;
        this.finalDef = this.finalDef + itemReceived.defMod;
        this.finalArm = this.finalArm + itemReceived.armMod;
        this.finalSocialStanding = this.finalSocialStanding + itemReceived.socialMod;
        this.finalAttack = this.finalAttack + itemReceived.attackMod;
        this.finalDamageDone = this.finalDamageDone + itemReceived.damageMod;
    }


    public diceRolling(numberofDice: number): number {

        var rollResult: number = 0;

        for (let i = 0; i < numberofDice; i++) {
            rollResult = rollResult + 1 + Math.floor(Math.random() * 6);

        }
        return rollResult;
    }

}
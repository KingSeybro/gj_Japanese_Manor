import {createPlayerCombatFromStructure, PlayerCombat} from "../shared/playerCombat";

export class CombatWrapper {

    public attackerObject: PlayerCombat;
    public defenderObject: PlayerCombat;
    public summaryString: string;
    public attackName: string;
    public attackHit: boolean;
    public damageDealt: number;

    constructor(attackerObject: PlayerCombat, defenderObject: PlayerCombat, summaryString: string, attackName: string, attackHit: boolean, damageDealt: number) {
        this.attackerObject = attackerObject.createMinimumDataObj();
        this.defenderObject = defenderObject.createMinimumDataObj();
        this.summaryString = summaryString;
        this.attackName = attackName;
        this.attackHit = attackHit;
        this.damageDealt = damageDealt;
    }

    public getAttackerObject(): PlayerCombat {
        return createPlayerCombatFromStructure(this.attackerObject);
    }

    public getDefenderObject(): PlayerCombat {
        return createPlayerCombatFromStructure(this.defenderObject);
    }
}
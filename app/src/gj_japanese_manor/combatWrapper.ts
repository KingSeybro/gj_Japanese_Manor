import {createPlayerCombatFromStructure, PlayerCombat} from "../shared/playerCombat";

export class CombatWrapper {

    public attackerObject: PlayerCombat;
    public defenderObject: PlayerCombat;
    public summaryString: string;
    public attackName: string;

    constructor(attackerObject: PlayerCombat, defenderObject: PlayerCombat, summaryString: string, attackName: string) {
        this.attackerObject = attackerObject.createMinimumDataObj();
        this.defenderObject = defenderObject.createMinimumDataObj();
        this.summaryString = summaryString;
        this.attackName = attackName;
    }

    public getAttackerObject(): PlayerCombat {
        return createPlayerCombatFromStructure(this.attackerObject);
    }

    public getDefenderObject(): PlayerCombat {
        return createPlayerCombatFromStructure(this.defenderObject);
    }
}
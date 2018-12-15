import {PlayerCombat} from "../shared/playerCombat";

export class CombatWrapper {

    public attackerObject: PlayerCombat;
    public defenderObject: PlayerCombat;
    public summaryString: string;
    public attackName: string;

    constructor(attackerObject: PlayerCombat, defenderObject: PlayerCombat, summaryString: string, attackName: string) {
        this.attackerObject = attackerObject;
        this.defenderObject = defenderObject;
        this.summaryString = summaryString;
        this.attackName = attackName;
    }
}
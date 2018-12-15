import {PlayerCombat} from "../shared/playerCombat";

export class CombatWrapper{

    public attackerObject: PlayerCombat;
    public defenderObject: PlayerCombat;
    public summaryString: String;
    public attackName: String;

    constructor(attackerObject: PlayerCombat, defenderObject: PlayerCombat, summaryString: String, attackName: String){
        this.attackerObject = attackerObject;
        this.defenderObject = defenderObject;
        this.summaryString = summaryString;
        this.attackName = attackName;
    }
}
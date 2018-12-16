import {PlayerCombat} from "../../shared/playerCombat";

export class SceneHelper{

    public _char: number;
    public _background: number;
    public  _player: PlayerCombat;


    constructor(char: number, background: number, player: PlayerCombat) {
        this._player = player;
        this._char = char;
        this._background = background;
    }


}
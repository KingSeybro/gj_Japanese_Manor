export class PlayerInfo {
    public position: Position
    public inCombat: boolean;
    public id: string;

    constructor(id: string, position: Position) {
        this.position = position;
        this.inCombat = false;
        this.id = id;
    }
}

export class Position {
    public x: number;
    public y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
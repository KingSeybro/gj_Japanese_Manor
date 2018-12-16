export class SelectedPlayer {
    public clickedPlayerIndex: number;
    public identifier: string;
    public type: string;
    public soundMap: Map<string, string[]>;

    constructor(clickedPlayerIndex: number, identifier: string, type: string, soundMap: Map<string, string[]>) {
        this.clickedPlayerIndex = clickedPlayerIndex;
        this.identifier = identifier;
        this.type = type;
        this.soundMap = soundMap;
    }

}
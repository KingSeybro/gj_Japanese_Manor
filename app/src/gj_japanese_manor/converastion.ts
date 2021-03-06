export class Conversation {
    private conv: ConversationNode[];


    constructor(json) {
        this.conv = [];
        for (let i = 0; i < json.length; i++) {
            let regExp = /\[\[(.*)\|(.*)\]\]/g;
            let options: ConversationNodeOption[] = [];
            let match;
            do {
                match = regExp.exec(json[i].body);
                if(match){
                        options.push({
                            text:match[1],
                            value:match[2]
                        });
                }
            } while (match);

            let outcome = undefined;
            if(json[i].tags.indexOf('BadEnding')!=-1){
                outcome = false;
            }
            if(json[i].tags.indexOf('GoodEnding')!=-1){
                outcome = true;
            }

            this.conv.push({
                title: json[i].title,
                text: json[i].body.split("\n")[0],
                options:options,
                outcome: outcome
            })
        }
    }

    public getNextNode(value : string = null): any{
        if(value==null){
            return this.conv[0];
        }
        for (let i = 0; i < this.conv.length; i++) {
            if(this.conv[i].title == value){
                return this.conv[i];
            }
        }
        return;
    }
}

export class ConversationNode{
    title: string;
    text: string;
    options :ConversationNodeOption[];
    outcome: boolean;

}

export class ConversationNodeOption{
    value: string;
    text: string;
}
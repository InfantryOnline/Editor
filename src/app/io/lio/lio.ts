export enum LioType {
    Door = 1,
    Switch,
    Flag,
    WarpField,
    Hide,
    Portal,
    Sound,
    Text,
    Parallax,
    Nested
}

export interface ILioEntry {
    type: LioType;
    name: string;
    id: number;
    version: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    relativeId: number;
    huntFrequency: number;
}

export class LioEntry {
    type: LioType;
    name: string;
    id: number;
    version: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    relativeId: number;
    huntFrequency: number;

    constructor(type: LioType) {
        this.type = type;
        this.name = "";
        this.id = 0;
        this.version = "";
        this.offsetX = 0;
        this.offsetY = 0;
        this.width = 0;
        this.height = 0;
        this.relativeId = 0;
        this.huntFrequency = 0;
    }
}

export class Text extends LioEntry {
    color: number;
    frequency: number;
    text: string;

    constructor() {
        super(LioType.Text);
        this.color = 0;
        this.frequency = 0;
        this.text = "";
    }
}

export class LioFile {
    entries: ILioEntry[];

    constructor() {
        this.entries = [];
    }

    parse(csvString: string): void {
        // use parse stuff here
        console.log(csvString);
    }
}

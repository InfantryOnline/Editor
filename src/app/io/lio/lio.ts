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
    version: string;
    id: number;
    name: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    relativeId: number;
    huntFrequency: number;
}

export class LioEntry implements ILioEntry {
    type: LioType;
    version: string;
    id: number;
    name: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    relativeId: number;
    huntFrequency: number;

    constructor(type: LioType) {
        this.type = type;
        this.version = "";
        this.id = 0;
        this.name = "";
        this.offsetX = 0;
        this.offsetY = 0;
        this.width = 0;
        this.height = 0;
        this.relativeId = 0;
        this.huntFrequency = 0;
    }
}

import { LioEntry, LioType } from "./lio";

export class Text extends LioEntry {
    color: number = 0;
    frequency: number = 0;
    text: string = "";

    constructor() {
        super(LioType.Text);
    }
}

import { LioEntry, LioType } from "./lio";

export class LioNested extends LioEntry {
    nestedLioFileName: string = "";

    constructor() {
        super(LioType.Nested);
    }
}

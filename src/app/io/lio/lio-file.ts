import { LioEntry } from "./lio";
import * as Papa from 'papaparse';

export class LioFile {
    entries: LioEntry[];

    constructor() {
        this.entries = [];
    }

    async parse(buffer: ArrayBuffer) {
        const text = new TextDecoder().decode(buffer);
        let parsed = await Papa.parse(text, {header: false});

        for (let line of parsed.data as any[]) {
            // Remove 'empty' lines
            if (line.length === 1 && line[0] === '') {
                continue;
            }

            let entry = new LioEntry();
            entry.parse(line);

            this.entries.push(entry);
        }

        console.log(this);
    }
}

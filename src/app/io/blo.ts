import { ArrayBufferStreamReader } from "./arraybufferstreamreader";

/**
 * Individual files within the blob file.
 */
export interface IBlobEntry {
    name: string;
    offset: number;
    length: number;
}

export class BlobFile {
    entries: IBlobEntry[];

    constructor() {
        this.entries = [];
    }

    deserialize(buffer: ArrayBuffer) {
        let reader = new ArrayBufferStreamReader(buffer);

        let version = reader.getInt32();
        let filecount = reader.getUint32();

        let nameLength = version === 2 ? 32 : 14;

        for(let i = 0; i < filecount; i++) {
            let name = reader.getString(nameLength);
            let offset = reader.getUint32();
            let length = reader.getUint32();           
            this.entries.push({name, offset, length});
        }
    }
}
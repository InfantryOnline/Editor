/**
 * Provides stream-line reading capabilities to an ArrayBuffer.
 */
export class ArrayBufferStreamReader {
    constructor(buffer: ArrayBuffer) {
        this.buffer = buffer;
        this.pos = 0;
        this.dataview = new DataView(this.buffer);
    }

    seek(pos: number) {
        this.pos = pos;
    }

    getInt32() : number {
        let val = this.dataview.getInt32(this.pos, true);
        this.pos += 4;

        return val;
    }

    getUint32() : number {
        let val = this.dataview.getUint32(this.pos, true);
        this.pos += 4;

        return val;
    }

    getInt16() : number {
        let val = this.dataview.getInt16(this.pos, true);
        this.pos += 2;

        return val;
    }

    getUint16() : number {
        let val = this.dataview.getUint16(this.pos, true);
        this.pos += 2;

        return val;
    }

    getInt8() : number {
        let val = this.dataview.getInt8(this.pos);
        this.pos += 1;

        return val;
    }

    getUint8() : number {
        let val = this.dataview.getUint8(this.pos);
        this.pos += 1;

        return val;
    }

    getUint8Array(length: number) : Uint8Array {
        let array = new Uint8Array(this.buffer, this.pos, length);
        this.pos += length;
        return array;
    }

    getInt8Array(length: number) : Int8Array {
        let array = new Int8Array(this.buffer, this.pos, length);
        this.pos += length;
        return array;
    }

    getString(length: number) : string {
        let byteArray = this.getUint8Array(length); // advanced

        let val = new TextDecoder().decode(byteArray);
        val = val.substring(0, val.indexOf('\x00'));
        return val;
    }

    getSlice(length: number) : ArrayBuffer {
        let array = this.buffer.slice(this.pos, this.pos + length);
        this.pos += length;
        return array;
    }

    getRle(size: number, count: number, encodedLengths: boolean): number[] {
        let data: number[] = [];

        // Prefill and zero out, just so we have a clean array.
        for (let i = 0; i < size * count; i++) {
            data[i] = 0;
        }

        for (let stage = 0; stage < size; stage++) {
            let offset = stage;

            let left = count;

            while (left > 0) {
                let repeat = this.getUint8();

                if (encodedLengths === true && repeat === 0) {
                    repeat = this.getUint8() << 8;
                    repeat |= this.getUint8();
                }

                left -= repeat;

                let value = this.getUint8();

                for (; repeat > 0; offset += size) {
                    data[offset] = value;
                    repeat--;
                }
            }
        }

        return data;
    }

    private buffer: ArrayBuffer;
    private pos: number;
    private dataview: DataView;
}

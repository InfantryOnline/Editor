import { ArrayBufferStreamReader } from "./arraybufferstreamreader";
import { arrayCopy } from "./utils";

export enum CompressionFlags {
    None = 0,
    DupeRowsVertically = 1 << 0,
    DupeRowsHorizontally = 1 << 1,
    ColumnsAreHalfRotation = 1 << 2,
    ColumnsAreQuarterRotation = 1 << 3,
    NoPixels = 1 << 4,
    RowsAreHalfRotation = 1 << 5,
    RowsAreQuarterRotation = 1 << 6,
    NoCompression = 1 << 7,
    Unknown8 = 1 << 8
}

export class SpriteHeader {
    [key: string]: any;

    frameCount: number = 0;
    animationTime: number = 0;
    width: number = 0;
    height: number = 0;
    rowCount: number = 0;
    columnCount: number = 0;
    lightCount: number = 0;
    shadowCount: number = 0;
    userDataSize: number = 0;
    compressionFlags: number = 0;
    maxSolidIndex: number = 0;
    dataSize: number = 0;
    category: string = '';
    blitMode: number = 0;
    rowMeaning: number = 0;
    ySortAdjust: number = 0;
    sortTransform: number = 0;
    userPaletteStart: number = 0;
    userPalette: number = 0;
    description: string = '';
    unknown20: number = 0;
    unknown76: Int8Array | null = null;

    read(reader: ArrayBufferStreamReader) {
        this.dataSize = reader.getUint32();
        this.frameCount = reader.getUint16();
        this.animationTime = reader.getUint16();
        this.width = reader.getUint16();
        this.height = reader.getUint16();
        this.rowCount = reader.getUint16();
        this.columnCount = reader.getUint16();
        this.lightCount = reader.getUint16();
        this.shadowCount = reader.getUint16();
        this.userDataSize = reader.getUint16();
        this.ySortAdjust = reader.getUint16();
        this.compressionFlags = reader.getUint32();
        this.blitMode = reader.getUint16();
        this.rowMeaning = reader.getUint16();
        this.unknown20 = reader.getUint16();
        this.maxSolidIndex = reader.getUint8();
        this.sortTransform = reader.getUint8();
        this.userPaletteStart = reader.getUint8();
        this.userPalette = reader.getUint8();
        this.category = reader.getString(32);
        this.description = reader.getString(48);
        this.unknown76 = reader.getInt8Array(64);
    }
}

class SpriteOldHeaderV4 {
    [key: string]: any;

    frameCount: number = 0;
    animationTime: number = 0;
    width: number = 0;
    height: number = 0;
    rowCount: number = 0;
    columnCount: number = 0;
    lightCount: number = 0;
    shadowCount: number = 0;
    userDataSize: number = 0;
    compressionFlags: number = 0;
    maxSolidIndex: number = 0;
    dataSize: number = 0;
    category: string = '';
    blitMode: number = 0;
    rowMeaning: number = 0;
    ySortAdjust: number = 0;
    sortTransform: number = 0;
    userPaletteStart: number = 0;
    userPalette: number = 0;
    description: string = '';
    unknown5f: Int8Array | null = null;

    read(reader: ArrayBufferStreamReader) {
        this.frameCount = reader.getUint16();
        this.animationTime = reader.getUint16();
        this.width = reader.getUint16();
        this.height = reader.getUint16();
        this.rowCount = reader.getUint16();
        this.columnCount = reader.getUint16();
        this.lightCount = reader.getUint16();
        this.shadowCount = reader.getUint16();
        this.userDataSize = reader.getUint16();
        this.compressionFlags = reader.getUint8();
        this.maxSolidIndex = reader.getUint8();
        this.dataSize = reader.getUint32();
        this.category = reader.getString(16);
        this.blitMode = reader.getUint8();
        this.rowMeaning = reader.getUint8();
        this.ySortAdjust = reader.getUint16();
        this.sortTransform = reader.getUint8();
        this.userPaletteStart = reader.getUint8();
        this.userPalette = reader.getUint8();
        this.description = reader.getString(48);
        this.unknown5f = reader.getInt8Array(32);
    }
}

class SpriteOldHeaderV3 {
    [key: string]: any;

    frameCount: number = 0;
    animationTime: number = 0;
    width: number = 0;
    height: number = 0;
    rowCount: number = 0;
    columnCount: number = 0;
    lightCount: number = 0;
    shadowCount: number = 0;
    userDataSize: number = 0;
    compressionFlags: number = 0;
    maxSolidIndex: number = 0;
    dataSize: number = 0;
    category: string = '';
    blitMode: number = 0;
    rowMeaning: number = 0;
    ySortAdjust: number = 0;
    sortTransform: number = 0;
    userPaletteStart: number = 0;
    userPalette: number = 0;
    unknown2f: Int8Array | null = null;

    read(reader: ArrayBufferStreamReader) {
        this.frameCount = reader.getUint16();
        this.animationTime = reader.getUint16();
        this.width = reader.getUint16();
        this.height = reader.getUint16();
        this.rowCount = reader.getUint16();
        this.columnCount = reader.getUint16();
        this.lightCount = reader.getUint16();
        this.shadowCount = reader.getUint16();
        this.userDataSize = reader.getUint16();
        this.compressionFlags = reader.getUint8();
        this.maxSolidIndex = reader.getUint8();
        this.dataSize = reader.getUint32();
        this.category = reader.getString(16);
        this.blitMode = reader.getUint8();
        this.rowMeaning = reader.getUint8();
        this.ySortAdjust = reader.getUint16();
        this.sortTransform = reader.getUint8();
        this.userPaletteStart = reader.getUint8();
        this.userPalette = reader.getUint8();
        this.unknown2f = reader.getInt8Array(9);
    }
}

class SpriteOldHeaderV2 {
    [key: string]: any;

    frameCount: number = 0;
    animationTime: number = 0;
    width: number = 0;
    height: number = 0;
    rowCount: number = 0;
    columnCount: number = 0;
    lightCount: number = 0;
    shadowCount: number = 0;
    userDataSize: number = 0;
    compressionFlags: number = 0;
    maxSolidIndex: number = 0;
    unknown14: Uint8Array | null = null;
    dataSize: number = 0;

    read(reader: ArrayBufferStreamReader) {
        this.frameCount = reader.getUint16();
        this.animationTime = reader.getUint16();
        this.width = reader.getUint16();
        this.height = reader.getUint16();
        this.rowCount = reader.getUint16();
        this.columnCount = reader.getUint16();
        this.lightCount = reader.getUint16();
        this.shadowCount = reader.getUint16();
        this.userDataSize = reader.getUint16();
        this.compressionFlags = reader.getUint8();
        this.maxSolidIndex = reader.getUint8();
        this.unknown14 = reader.getUint8Array(6);
        this.dataSize = reader.getUint32();
    }
}

export class SpriteFrameInfo {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    offset: number = 0;

    read(reader: ArrayBufferStreamReader) {
        this.x = reader.getUint16();
        this.y = reader.getUint16();
        this.width = reader.getInt16(); // can be negative
        this.height = reader.getInt16(); // can be negative
        this.offset = reader.getUint32();
    }
}

export interface ISpriteFrame {
    x: number;
    y: number;
    width: number;
    height: number;
    pixels: Uint8Array;
}

export class SpriteFile {
    version: number = 0;
    header: SpriteHeader | null = null;
    palette: number[] = [];
    userData: Uint8Array | null = null;
    infos: SpriteFrameInfo[] = [];
    frames: ISpriteFrame[] = [];

    deserialize(buffer: ArrayBuffer) {
        let reader = new ArrayBufferStreamReader(buffer);

        this.version = reader.getInt16();

        if (this.version < 2 || this.version > 5) {
            throw new Error(`Unsupported CFS version ${this.version}.`);
        }

        this.header = new SpriteHeader();
        let oldHeader = null;

        if (this.version >= 5) {
            this.header.read(reader);
        } else if (this.version >= 4) {
            oldHeader = new SpriteOldHeaderV4();
            oldHeader.read(reader);
        } else if (this.version >= 3) {
            oldHeader = new SpriteOldHeaderV3();
            oldHeader.read(reader);
        } else if (this.version >= 1) {
            oldHeader = new SpriteOldHeaderV2();
            oldHeader.read(reader);
        }

        if (oldHeader !== null) {
            var keys = Object.keys(oldHeader);

            for(let k of keys) {
                if (oldHeader.hasOwnProperty(k)) {
                    this.header[k] = oldHeader[k] || 0;

                    if (k === 'description' || k === 'category') {
                        this.header[k] = this.header[k] || '';
                    }

                    this.header['unknown20'] = this.header['unknown20'] || 0;
                }
            }
        }

        if (this.header.lightCount != 0 && this.header.lightCount != 32) {
            throw new Error('Bad light count in header');
        }

        if (this.header.shadowCount != 0 && this.header.shadowCount != 8) {
            throw new Error('Bad shadow count in header');
        }

        this.palette = [];

        for(let i = 0; i < 256; i++) {
            this.palette.push(reader.getUint32());
        }

        this.userData = reader.getUint8Array(this.header.userDataSize);

        this.infos = [];

        for(let i = 0; i < this.header.frameCount; i++) {
            let info = new SpriteFrameInfo();
            info.read(reader);
            this.infos.push(info);
        }

        if ((this.header.compressionFlags & ~0x1FF) != 0) {
            throw new Error('Unknown compression flags');
        }

        if (this.header.unknown20 != 0 && this.header.unknown20 != 3) {
            throw new Error('Unsupported unknown20 value.');
        }

        if ((this.header.compressionFlags & CompressionFlags.NoCompression) != 0) {
           if ((this.header.compressionFlags & ~(CompressionFlags.NoPixels | CompressionFlags.NoCompression)) != 0) {
               throw new Error("other compression flags set with NoCompression flag");
           }
        }

        let data = reader.getSlice(this.header.dataSize);
        let dataSequential = new ArrayBufferStreamReader(data);
        this.frames = [];

        for (let i = 0; i < this.header.frameCount; i++) {
            let info = this.infos[i];

            dataSequential.seek(info.offset);

            let pixelData;

            if ((this.header.compressionFlags & CompressionFlags.NoCompression) != 0) {
                // Uncompressed data.
                pixelData = dataSequential.getUint8Array(Math.abs(info.width) * Math.abs(info.height));
            } else {
                // Compressed data.
                let data: number[] = [];
                let lengths = [];
                let max = 0;

                for (let y = 0; y < Math.abs(info.height); y++) {
                    let l = dataSequential.getUint8();

                    if (l == 0xFF) {
                        l = dataSequential.getUint16();
                    }
                    lengths.push(l);
                    max = Math.max(max, l);
                }

                for (let y = 0, offset = 0; y < Math.abs(info.height); y++, offset = y * Math.abs(info.width)) {
                    let l = lengths[y];
                    let scanline = [];

                    for (let j = 0; j < l; j++) {
                        scanline.push(dataSequential.getUint8());
                    }

                    for(let x = 0; x < l;) {
                        offset += (scanline[x] >> 4) & 0xF; //transparent;

                        let literalCount = scanline[x] & 0xF;
                        if (literalCount > 0) {
                            arrayCopy(scanline, x + 1, data, offset, literalCount);
                        }

                        offset += literalCount;
                        x += 1 + literalCount;
                    }
                }

                pixelData = Uint8Array.from(data);
            }

            // TODO: rest of rotation etc.

            let frame: ISpriteFrame = {x: info.x, y: info.y, width: Math.abs(info.width), height: Math.abs(info.height), pixels: pixelData};

            this.frames.push(frame);
        }

        let shadowIndex = 256 - this.header.shadowCount;
        let lightIndex = shadowIndex - this.header.lightCount;
        let dontFixSpecialColors: any = true;

        // Fix up the palette before returning.
        for (let i = 0; i < 256; i++) {
            let color = this.palette[i];

            let r = (color >> 16)   & 0xFF;
            let g = (color >> 8)    & 0xFF;
            let b = (color >> 0)    & 0xFF;
            let a = 0;

            if (i == 0) {
                a = 0;
            } else if (this.header.shadowCount > 0 && i >= shadowIndex) {
                if (dontFixSpecialColors == false) {
                    // make shadows black + alpha
                    a = 64 + (((i - shadowIndex) + 1) * 16);
                    r = g = b = 0;
                } else {
                    a = 255;
                }
            } else if (this.header.lightCount > 0 && i >= lightIndex) {
                if (dontFixSpecialColors == false) {
                    // make lights white + alpha
                    a = 64 + (((i - lightIndex) + 1) * 4);
                    r = g = b = 255;
                } else {
                    a = 255;
                }
            } else {
                a = 255;
            }

            this.palette[i] = ((r << 24) + (g << 16) + (b << 8) + a);
        }
    }
}
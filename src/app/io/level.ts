import { ArrayBufferStreamReader } from "./arraybufferstreamreader";

export class LevelBlobReference {
    filename: string = '';
    id: string = '';
    read(reader: ArrayBufferStreamReader) {
        this.filename = reader.getString(32).toLowerCase();
        this.id = reader.getString(32).toLowerCase();
    }
}

export class LevelHeader {
    version: number = 0;
    width: number = 0;
    height: number = 0;
    entityCount: number = 0;
    floorCount: number = 0;
    objectCount: number = 0;
    minimapPalette: number[] = [];
    offsetX: number = 0;
    offsetY: number = 0;
    terrainIds: number[] = [];
    physicsLow: number[] = [];
    physicsHigh: number[] = [];
    lightColorWhite: number =  0;
    lightColorRed: number = 0;
    lightColorGreen: number = 0;
    lightColorBlue: number = 0;
    padding: number[] = []; // discard?

    read(reader: ArrayBufferStreamReader) {
        this.version = reader.getInt32();
        this.width = reader.getInt32();
        this.height = reader.getInt32();
        this.entityCount = reader.getInt32();
        this.floorCount = reader.getInt32();
        this.objectCount = reader.getInt32();

        this.minimapPalette = [];

        for (let i = 0; i < 512; i++) {
            this.minimapPalette.push(reader.getUint32());
        }

        this.offsetX = reader.getInt32();
        this.offsetY = reader.getInt32();

        this.terrainIds = [];

        for (let i = 0; i < 128; i++) {
            this.terrainIds.push(reader.getInt32());
        }

        this.physicsLow = [];

        for (let i = 0; i < 32; i++) {
            this.physicsLow.push(reader.getInt16());
        }

        this.physicsHigh = [];

        for (let i = 0; i < 32; i++) {
            this.physicsHigh.push(reader.getInt16());
        }

        this.lightColorWhite    = reader.getUint32();
        this.lightColorRed      = reader.getUint32();
        this.lightColorGreen    = reader.getUint32();
        this.lightColorBlue     = reader.getUint32();

        this.padding = [];

        for (let i = 0; i < 2416; i++) {
            this.padding.push(reader.getUint8());
        }
    }
}

export class LevelEntity {
    x: number = 0;
    y: number = 0;
    bitsA: number = 0;
    bitsB: number = 0;
    bitsC: number = 0;
    bitsD: number = 0;

    read(reader: ArrayBufferStreamReader, version: number) {
        this.x = reader.getInt16();
        this.y = reader.getInt16();
        this.bitsA = reader.getUint32();
        this.bitsB = reader.getUint32();
        this.bitsC = version < 3 ? reader.getUint8() : reader.getUint32();
        this.bitsD = reader.getUint8();

        if (version < 3) {
            this.bitsA &= 0x3FFFFFFF;
            this.bitsB &= 0x7FFFFFFF;
            let tmpC = this.bitsC;
            this.bitsC = (this.bitsD & 0x7F) << 23;
            this.bitsD = tmpC;
        }
    }

    get objectIndex() {
        return this.bitsA & 0x00001FFF;
    }

    get frameIndex() {
        return (this.bitsA & 0x000FE000) >> 13;
    }
}

export class LevelTile {
    constructor(public bitsA: number, public bitsB: number, public bitsC: number) { }

    get isBlocked() {
        return this.physicsIndex !== 0;
    }

    get physicsIndex() {
        return this.bitsC & 0x1F;
    }

    get visionIndex() {
        return this.bitsC >> 5;
    }

    get terrainIndex() {
        return this.bitsA & 0x7F;
    }
}

export class LevelFile {
    setDefaults() {
        this.lightColorWhite    = 0xFFFFFF00;
        this.lightColorRed      = 0x0000FF00;
        this.lightColorGreen    = 0x00FF0000;
        this.lightColorBlue     = 0xFF000000;

        this.physicsLow = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];

        this.physicsHigh = [
            0,
            1024,
            1024,
            1024,
            1024,
            1024,
            16,
            16,
            16,
            16,
            16,
            32,
            32,
            32,
            32,
            32,
            64,
            64,
            64,
            64,
            64,
            128,
            128,
            128,
            128,
            128,
            1024,
            1024,
            1024,
            1024,
            1024,
            1024
        ];
    }

    header: LevelHeader = new LevelHeader();
    terrainIds: number[] = [];
    lightColorWhite: number = 0;
    lightColorRed: number = 0;
    lightColorGreen: number = 0;
    lightColorBlue: number = 0;
    physicsLow: number[] = [];
    physicsHigh: number[] = [];
    objects: LevelBlobReference[] = [];
    floors: LevelBlobReference[] = [];
    tiles: LevelTile[] = [];
    entities: LevelEntity[] = [];

    deserialize(buffer: ArrayBuffer) {
        this.setDefaults();

        let reader = new ArrayBufferStreamReader(buffer);

        this.header = new LevelHeader();
        this.header.read(reader);

        this.terrainIds = []; // Why are we making a copy again?

        for (let i = 0; i < this.header.terrainIds.length; i++) {
            this.terrainIds.push(this.header.terrainIds[i] % 16);
        }

        if (this.header.version >= 4) {
            this.lightColorWhite = this.header.lightColorWhite;
            this.lightColorBlue = this.header.lightColorBlue;
            this.lightColorRed = this.header.lightColorRed;
            this.lightColorGreen = this.header.lightColorGreen;

            this.physicsLow = this.header.physicsLow;
            this.physicsHigh = this.header.physicsHigh;   
        }

        this.objects = [];

        if (this.header.version >= 6) {
            for (let i = 0; i < this.header.objectCount; i++) {
                let ref = new LevelBlobReference();
                ref.read(reader);

                this.objects.push(ref);
            }
        } else {
            for (let i = 0; i < this.header.objectCount; i++) {
                let ref = new LevelBlobReference();

                ref.filename = '';
                ref.id = `o${i}.cfs`;

                this.objects.push(ref);
            }
        }

        this.floors = [];

        if (this.header.version >= 6) {
            for (let i = 0; i < this.header.floorCount; i++) {
                let ref = new LevelBlobReference();
                ref.read(reader);

                this.floors.push(ref);
            }
        } else {
            for (let i = 0; i < this.header.floorCount; i++) {
                let ref = new LevelBlobReference();

                ref.filename = '';
                ref.id = `f${i}.cfs`;

                this.floors.push(ref);
            }
        }

        let tileCount = this.header.width * this.header.height;
        let tileData = reader.getRle(3, tileCount, true);

        this.tiles = [];

        for (let i = 0, j = 0; i < tileCount; i++, j += 3) {
            let bA = tileData[j + 0];
            let bB = tileData[j + 1];
            let bC = tileData[j + 2];

            let tile = new LevelTile(bA, bB, bC);

            this.tiles.push(tile);
        }

        if (this.header.version < 4) {
            let magic = [
                0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x1A, 0x1B,
                0x1C, 0x1D, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                0x00, 0x06, 0x07, 0x08, 0x09, 0x10, 0x1A, 0x1B,
                0x1C, 0x1D, 0x00, 0x00, 0x6C, 0x00, 0x00, 0x00,
            ];

            for (let i = 0; i < this.tiles.length; i++) {
                let a = this.tiles[i].bitsC;
                let b = (magic[a & 0x1F] ^ a) & 0x1F;
                this.tiles[i].bitsC ^= b;
            }
        }

        this.entities = [];

        if (this.header.version >= 3) {
            console.log('Loading entities v3 and above.');
            for (let i = 0; i < this.header.entityCount; i++) {
                let e = new LevelEntity();
                e.read(reader, this.header.version);

                this.entities.push(e);
            }
        } else {
            let entityData = reader.getRle(14, this.header.entityCount, true);

            let entityBuffer = Int32Array.from(entityData); // Holds maximum 4 bits per element, if need be.
            let entityReader = new ArrayBufferStreamReader(entityBuffer.buffer);

            for (let i = 0; i < this.header.entityCount; i++) {
                let e = new LevelEntity();
                e.read(entityReader, this.header.version);

                this.entities.push(e);
            }
        }

        if (this.header.version < 5) {
            for (let i = 0; i < this.header.entityCount; i++) {
                this.entities[i].bitsC &= 0xBFFFFFFF;
            }
        }
    }
}
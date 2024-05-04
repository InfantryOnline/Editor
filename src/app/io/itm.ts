import { CsvFragment, Field, FieldPredicate } from "./csv/field";
import * as Papa from 'papaparse';

export enum ItemType {
    Unknown = 0,
    Multi = 1,
    Ammo = 4,
    Projectile = 6,
    VehicleMaker = 7,
    MultiUse = 8,
    Repair = 11,
    Control = 12,
    Utility = 13,
    ItemMaker = 14,
    Upgrade = 15,
    SkillI = 16,
    Warp = 17,
    Nested = 18
}

export enum PickupMode {
    Manual,
    ManualAutoAll,
    ManualAutoNeed,
    AutoAll,
    AutoNeed,
    AutoHaveNone
}

export class Graphics extends CsvFragment {
    @Field(0)
    blobName: string = '';

    @Field(1)
    blobId: string = '';

    @Field(2)
    lightPermutation: number = 0;

    @Field(3)
    paletteOffset: number = 0;

    @Field(4)
    hue: number = 0;

    @Field(5)
    saturation: number = 0;

    @Field(6)
    value: number = 0;

    @Field(7)
    animationTime: number = 0;
}

export class Sound extends CsvFragment {
    @Field(0)
    blobName: string = '';

    @Field(1)
    blobId: string = '';

    @Field(2)
    maxSimultaneous: number = 0;
}

export class General extends CsvFragment {
    @Field(0)
    version: string = '';

    @Field(1)
    id: number = 0;

    @Field(2)
    name: string = '';

    @Field(3)
    category: string = '';

    @Field(4)
    skillLogic: string = '';

    @Field(5)
    description: string = '';

    @Field(6)
    weight:number = 0;

    @Field(7)
    buyPrice: number = 0;

    @Field(8)
    probability: number = 0;

    @Field(9)
    droppable: boolean = false;

    @Field(10)
    keyPreference: number = 0;

    @Field(11)
    recommended: number = 0;

    @Field(12)
    maxAllowed: number = 0;

    @Field(13)
    pickupMode: PickupMode = PickupMode.Manual;

    @Field(14)
    sellPrice: number = 0;

    @Field(15)
    expireTimer: number = 0;

    @Field(16)
    radarColor: number = 0;

    @Field(17)
    prizeBountyPoints: number = 0;

    @Field(18)
    relativeId: number = 0;

    @Field(19)
    heldCategoryType: number = 0;

    @Field(20)
    pruneDropPercent: number = 0;

    @Field(21)
    pruneOdds: number = 0;
}

export class NestedItem extends CsvFragment {
    @Field(0)
    id: number = 0;

    @Field(1)
    version: string = '';

    @Field(2)
    itemID: number = 0;

    @Field(3)
    name: string = '';

    @Field(4)
    location: string = '';
}

export class AmmoItem extends CsvFragment {
    @Field(0)
    graphics: Graphics = new Graphics();
}

export class ItemEntry extends CsvFragment {
    @Field(0)
    type: ItemType = ItemType.Unknown;

    @Field(1)
    @FieldPredicate<ItemEntry>(ii => ii.type !== ItemType.Nested)
    general: General = new General();

    @Field(1)
    @FieldPredicate<ItemEntry>(ii => ii.type === ItemType.Nested)
    nested: NestedItem = new NestedItem();

    @Field(2)
    @FieldPredicate<ItemEntry>(ii => ii.type === ItemType.Ammo)
    ammo: AmmoItem = new AmmoItem();
}

/**
 * Represents an Item (.itm) file.
 */
export class ItemFile {
    entries: ItemEntry[] = [];

    async parse(buffer: ArrayBuffer) {
        const text = new TextDecoder().decode(buffer);
        let parsed = await Papa.parse(text, {header: false});
        
        for (let line of parsed.data as any[]) {
            // Remove 'empty' lines
            if (line.length === 1 && line[0] === '') {
                continue;
            }

            let entry = new ItemEntry();
            entry.parse(line);

            this.entries.push(entry);
        }

        console.log(this);
    }
}

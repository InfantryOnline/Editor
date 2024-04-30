import { ArrayField, CsvFragment, Field } from './csv/field';
import * as Papa from 'papaparse';

export enum Resets {
    NoSkills,
    AllSkills,
    OnlySkills,
    OnlyAttributes
}

export class RpgInventoryMutator extends CsvFragment {
    @Field(0)
    itemId: number = 0;

    @Field(1)
    quantity: number = 0;
}

export class RpgEntry extends CsvFragment {
    @Field(0)
    version: string = '';

    @Field(1)
    skillId: number = 0;

    @Field(2)
    price: number = 0;

    @Field(3)
    defaultVehicleId: number = 0;

    @Field(4)
    resetSkills: Resets = Resets.NoSkills;

    @Field(5)
    resetInventory: boolean = false;

    @Field(6)
    @ArrayField<RpgInventoryMutator>(RpgInventoryMutator, 16)
    mutators: RpgInventoryMutator[] = [];

    @Field(7)
    cashAdjustment: number = 0;

    @Field(8)
    name: string = '';

    @Field(9)
    category: string = '';

    @Field(10)
    logic: string = '';

    @Field(11)
    description: string = '';

    @Field(12)
    blobName: string = '';

    @Field(13)
    blobId: string = '';
}

/**
 * Represents a Skill (.rpg) file.
 */
export class RpgFile {
    entries: RpgEntry[] = [];

    async parse(buffer: ArrayBuffer) {
        const text = new TextDecoder().decode(buffer);
        let parsed = await Papa.parse(text, {header: false});
        
        for (let line of parsed.data as any[]) {
            // Remove 'empty' lines
            if (line.length === 1 && line[0] === '') {
                continue;
            }

            let entry = new RpgEntry();
            entry.parse(line);

            this.entries.push(entry);
        }

        console.log(this);
    }
}

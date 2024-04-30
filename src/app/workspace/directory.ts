/**
 * Contains a listing of the current Infantry Directory files.
 */
export class Directory {
    readonly LevelFileSuffix = '.lvl';
    readonly BloFileSuffix = '.blo';
    readonly ItemFileSuffix = '.itm';
    readonly VehFileSuffix = '.veh';
    readonly LioFileSuffix = '.lio';
    readonly RpgFileSuffix = '.rpg';

    files: File[] = [];

    get lvlFiles(): File[] {
        return this.files.filter(t => t.name.endsWith(this.LevelFileSuffix));
    }

    get bloFiles(): File[] {
        return this.files.filter(t => t.name.endsWith(this.BloFileSuffix));
    }

    get itmFiles(): File[] {
        return this.files.filter(t => t.name.endsWith(this.ItemFileSuffix));
    }

    get vehFiles(): File[] {
        return this.files.filter(t => t.name.endsWith(this.VehFileSuffix));
    }

    get lioFiles(): File[] {
        return this.files.filter(t => t.name.endsWith(this.LioFileSuffix));
    }

    get rpgFiles(): File[] {
        return this.files.filter(t => t.name.endsWith(this.RpgFileSuffix));
    }
}
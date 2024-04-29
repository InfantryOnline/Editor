import { ILioEntry, LioType } from "./lio";
import { LioDoor } from "./lio-door";
import { LioFlag } from "./lio-flag";
import { getEntries } from "../../helpers/csv-helpers";
import { LioHide } from "./lio-hide";
import { LioNested } from "./lio-nested";
import { LioParallax } from "./lio-parallax";
import { LioPortal } from "./lio-portal";
import { LioSound } from "./lio-sound";
import { LioSwitch } from "./lio-switch";
import { LioText } from "./lio-text";
import { LioWarpField } from "./lio-warp-field";

export class LioFile {
    entries: ILioEntry[];

    constructor() {
        this.entries = [];
    }

    assignEntries(parsedCsv: any[][]): void {
        this.entries = getEntries(parsedCsv, this.getClass) as ILioEntry[];
        console.log(this.entries);
    }

    getClass(type: LioType) {
        switch(type)
        {
            case LioType.Text:
                return new LioText();
            case LioType.WarpField:
                return new LioWarpField();
            case LioType.Switch:
                return new LioSwitch();
            case LioType.Sound:
                return new LioSound();
            case LioType.Portal:
                return new LioPortal();
            case LioType.Parallax:
                return new LioParallax();
            case LioType.Hide:
                return new LioHide();
            case LioType.Flag:
                return new LioFlag();
            case LioType.Door:
                return new LioDoor();
            case LioType.Nested:
                return new LioNested();
            default:
                return null;
        }
    }
}

import { CsvFragment, Field, FieldPredicate } from "../csv/field";
import { LioDoor } from "./lio-door";
import { LioFile } from "./lio-file";
import { LioFlag } from "./lio-flag";
import { LioHide } from "./lio-hide";
import { LioNested } from "./lio-nested";
import { LioParallax } from "./lio-parallax";
import { LioPortal } from "./lio-portal";
import { LioSound } from "./lio-sound";
import { LioSwitch } from "./lio-switch";
import { LioText } from "./lio-text";
import { LioWarpField } from "./lio-warp-field";

export enum LioType {
    Unknown = 0,
    Door = 1,
    Switch,
    Flag,
    WarpField,
    Hide,
    Portal,
    Sound,
    Text,
    Parallax,
    Nested
}

export class LioGeneral extends CsvFragment {
    @Field(0)
    type: LioType = LioType.Unknown;

    @Field(1)
    version: string = "";

    @Field(2)
    id: number = 0;

    @Field(3)
    name: string = "";

    @Field(4)
    offsetX: number = 0;

    @Field(5)
    offsetY: number = 0;

    @Field(6)
    width: number = 0;

    @Field(7)
    height: number = 0;

    @Field(8)
    relativeId: number = 0;

    @Field(9)
    huntFrequency: number = 0;
}

export class LioEntry extends CsvFragment{


    @Field(0)
    type: LioType = LioType.Unknown;

    @Field(1, LioGeneral)
    @FieldPredicate<LioEntry>(ii => ii.type !== LioType.Nested)
    general?: LioGeneral;

    @Field(1, LioNested)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Nested)
    nested?: LioNested;

    @Field(2, LioDoor)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Door)
    door?: LioDoor;

    @Field(2, LioFlag)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Flag)
    flag?: LioFlag;

    @Field(2, LioHide)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Hide)
    hide?: LioHide;

    @Field(2, LioParallax)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Parallax)
    parallax?: LioParallax;

    @Field(2, LioPortal)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Portal)
    portal?: LioPortal;

    @Field(2, LioSound)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Sound)
    sound?: LioSound;

    @Field(2, LioSwitch)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Switch)
    switch?: LioSwitch;

    @Field(2, LioText)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.Text)
    text?: LioText;

    @Field(2, LioWarpField)
    @FieldPredicate<LioEntry>(ii => ii.type === LioType.WarpField)
    warpField?: LioWarpField;
}

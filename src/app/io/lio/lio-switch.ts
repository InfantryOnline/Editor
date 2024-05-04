import { ArrayField, CsvFragment, Field } from "../csv/field";

export class SwitchLioId extends CsvFragment {
    @Field(0)
    value: number = 0;
}

export class LioSwitch extends CsvFragment {
    @Field(0)
    switch: number = 0;

    @Field(1)
    @ArrayField<SwitchLioId>(SwitchLioId, 17)
    switchLioId: SwitchLioId[] = [];

    @Field(2)
    switchDelay: number = 0;

    @Field(3)
    ammoId: number = 0;

    @Field(4)
    useAmmoAmount: number = 0;

    @Field(5)
    useEnergyAmount: number = 0;

    @Field(6)
    autoCloseDelay: number = 0;

    @Field(7)
    skillLogic: string = "";

    @Field(8)
    frequency: number = 0;

    @Field(9)
    ammoOverridesLogic: boolean = false;

    @Field(10)
    ammoOverridesFrequency: boolean = false;

    @Field(11)
    frequencyOverridesAmmo: boolean = false;

    @Field(12)
    frequencyOverridesLogic: boolean = false;

    @Field(13)
    logicOverridesAmmo: boolean = false;

    @Field(14)
    logicOverridesFrequency: boolean = false;

    @Field(15)
    switchGfxBlobName: string = "";

    @Field(16)
    switchGfxBlobId: string = "";

    @Field(17)
    lightPermutation: number = 0;

    @Field(18)
    paletteOffset: number = 0;

    @Field(19)
    hue: number = 0;

    @Field(20)
    saturation: number = 0;

    @Field(21)
    value: number = 0;

    @Field(22)
    animationTime: number = 0;

    @Field(23)
    switchSoundBlobName: string = "";

    @Field(24)
    switchSoundBlobId: string = "";

    @Field(25)
    switchSoundSimultaneous: number = 0;
}

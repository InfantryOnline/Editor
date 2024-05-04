import { CsvFragment, Field } from "../csv/field";

export class LioSound extends CsvFragment {
    @Field(0)
    frequency: number = 0;

    @Field(1)
    playOdds: number = 0;

    @Field(2)
    isTriggeredOnEntre: boolean = false;

    @Field(3)
    triggerDelay: number = 0;

    @Field(4)
    soundVolume: number = 0;

    @Field(5)
    minPlayerCount: number = 0;

    @Field(6)
    maxPlayerCount: number = 0;

    @Field(7)
    inactiveFrame: number = 0;

    @Field(8)
    soundGfxBlobName: string = "";

    @Field(9)
    soundGfxBlobIe: string = "";

    @Field(10)
    lightPermutation: number = 0;

    @Field(11)
    paletteOffset: number = 0;

    @Field(12)
    hue: number = 0;

    @Field(13)
    saturation: number = 0;

    @Field(14)
    value: number = 0;

    @Field(15)
    animationTime: number = 0;

    @Field(16)
    soundBlobName: string = "";

    @Field(17)
    soundBlobIe: string = "";

    @Field(18)
    simultaneous: number = 0;
}

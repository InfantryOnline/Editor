import { CsvFragment, Field } from "../csv/field";

export class LioPortal extends CsvFragment {
    @Field(0)
    frequency: number = 0;

    @Field(1)
    destinationWarpGroup: number = 0;

    @Field(2)
    skillLogic: string = "";

    @Field(3)
    damageIgnoreTime: number = 0;

    @Field(4)
    reuseDelay: number = 0;

    @Field(5)
    gravity: number = 0;

    @Field(6)
    portalGfxBlobName: string = "";

    @Field(7)
    portalGfxBlobId: string = "";

    @Field(8)
    portalLightPermutation: number = 0;

    @Field(9)
    portalPaletteOffset: number = 0;

    @Field(10)
    portalHue: number = 0;

    @Field(11)
    saturation: number = 0;

    @Field(12)
    portalValue: number = 0;

    @Field(13)
    portalAnimationTime: number = 0;

    @Field(14)

    radarGfxBlobName: string = "";

    @Field(15)
    radarGfxBlobId: string = "";

    @Field(16)
    radarLightPermutation: number = 0;

    @Field(17)
    radarPaletteOffset: number = 0;

    @Field(18)
    radarHue: number = 0;

    @Field(19)
    radarSaturation: number = 0;

    @Field(20)
    radarValue: number = 0;

    @Field(21)
    radarAnimationTime: number = 0;

    @Field(22)
    portalSoundBlobName: string = "";

    @Field(23)
    portalSoundBlobId: string = "";

    @Field(24)
    simultaneous: number = 0;
}

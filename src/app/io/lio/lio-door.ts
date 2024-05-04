import { CsvFragment, Field } from "../csv/field";
export class LioDoor extends CsvFragment {
    @Field(0)
    relativePhysicsTileX: number = 0;

    @Field(1)
    relativePhysicsTileY: number = 0;

    @Field(2)
    physicsWidth: number = 0;

    @Field(3)
    physicsHeight: number = 0;

    @Field(4)
    openOdds: number = 0;

    @Field(5)
    linkedDoorId: number = 0;

    @Field(6)
    initialState: number = 0;

    @Field(7)
    inverseState: number = 0;

    @Field(8)
    gfxHorizontalTopBlobName: string = "";

    @Field(9)
    gfxHorizontalTopBlobId: string = "";

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
    soundOpenBlobName: string = "";

    @Field(17)
    soundOpenBlobId: string = "";

    @Field(18)
    openSimultaneous: number = 0;

    @Field(19)
    soundCloseBlobName: string = "";

    @Field(20)
    soundCloseBlobId: string = "";

    @Field(21)
    closeSimultaneous: number = 0;
}

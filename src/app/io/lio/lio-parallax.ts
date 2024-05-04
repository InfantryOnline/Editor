import { CsvFragment, Field } from "../csv/field";

export class LioParallax extends CsvFragment {
    @Field(0)
    nearDistance: number = 0;

    @Field(1)
    farDistance: number = 0;

    @Field(2)
    quantity: number = 0;

    @Field(3)
    parallaxBlobName: string = "";

    @Field(4)
    parallaxBlobId: string = "";

    @Field(5)
    lightPermutation: number = 0;

    @Field(6)
    paletteOffset: number = 0;

    @Field(7)
    hue: number = 0;

    @Field(8)
    saturation: number = 0;

    @Field(9)
    value: number = 0;

    @Field(10)
    animationTime: number = 0;
}

import { LioEntry, LioType } from "./lio";

export class LioParallax extends LioEntry {
    nearDistance: number = 0;
    farDistance: number = 0;
    quantity: number = 0;
    parallaxBlobName: string = "";
    parallaxBlobId: string = "";
    lightPermutation: number = 0;
    paletteOffset: number = 0;
    hue: number = 0;
    saturation: number = 0;
    value: number = 0;
    animationTime: number = 0;

    constructor() {
        super(LioType.Parallax);
    }
}

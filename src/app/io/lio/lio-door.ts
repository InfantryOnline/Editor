import { LioEntry, LioType } from "./lio";

export class LioDoor extends LioEntry {
    relativePhysicsTileX: number = 0;
    relativePhysicsTileY: number = 0;
    physicsWidth: number = 0;
    physicsHeight: number = 0;
    openOdds: number = 0;
    linkedDoorId: number = 0;
    initialState: number = 0;
    inverseState: number = 0;
    gfxHorizontalTopBlobName: string = "";
    gfxHorizontalTopBlobId: string = "";
    lightPermutation: number = 0;
    paletteOffset: number = 0;
    hue: number = 0;
    saturation: number = 0;
    value: number = 0;
    animationTime: number = 0;
    soundOpenBlobName: string = "";
    soundOpenBlobId: string = "";
    openSimultaneous: number = 0;
    soundCloseBlobName: string = "";
    soundCloseBlobId: string = "";
    closeSimultaneous: number = 0;

    constructor() {
        super(LioType.Door);
    }
}

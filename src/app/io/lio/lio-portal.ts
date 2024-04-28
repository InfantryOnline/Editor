import { LioEntry, LioType } from "./lio";

export class LioPortal extends LioEntry {
    frequency: number = 0;
    destinationWarpGroup: number = 0;
    skillLogic: string = "";
    damageIgnoreTime: number = 0;
    reuseDelay: number = 0;
    gravity: number = 0;

    portalGfxBlobName: string = "";
    portalGfxBlobId: string = "";
    portalLightPermutation: number = 0;
    portalPaletteOffset: number = 0;
    portalHue: number = 0;
    saturation: number = 0;
    portalValue: number = 0;
    portalAnimationTime: number = 0;

    radarGfxBlobName: string = "";
    radarGfxBlobId: string = "";
    radarLightPermutation: number = 0;
    radarPaletteOffset: number = 0;
    radarHue: number = 0;
    radarSaturation: number = 0;
    radarValue: number = 0;
    radarAnimationTime: number = 0;

    portalSoundBlobName: string = "";
    portalSoundBlobId: string = "";
    simultaneous: number = 0;

    constructor() {
        super(LioType.Portal);
    }
}

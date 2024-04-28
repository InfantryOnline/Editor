import { LioEntry, LioType } from "./lio";

export class LioSound extends LioEntry {
    frequency: number = 0;
    playOdds: number = 0;
    isTriggeredOnEntre: boolean = false;
    triggerDelay: number = 0;
    soundVolume: number = 0;
    minPlayerCount: number = 0;
    maxPlayerCount: number = 0;
    inactiveFrame: number = 0;
    soundGfxBlobName: string = "";
    soundGfxBlobIe: string = "";
    lightPermutation: number = 0;
    paletteOffset: number = 0;
    hue: number = 0;
    saturation: number = 0;
    value: number = 0;
    animationTime: number = 0;
    soundBlobName: string = "";
    soundBlobIe: string = "";
    simultaneous: number = 0;

    constructor() {
        super(LioType.Sound);
    }
}

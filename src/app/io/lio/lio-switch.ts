import { LioEntry, LioType } from "./lio";

export class LioSwitch extends LioEntry {
    switch: number = 0;
    switchLioId: number[] = [];
    switchDelay: number = 0;
    ammoId: number = 0;
    useAmmoAmount: number = 0;
    useEnergyAmount: number = 0;
    autoCloseDelay: number = 0;
    skillLogic: string = "";

    frequency: number = 0;
    ammoOverridesLogic: boolean = false;
    ammoOverridesFrequency: boolean = false;
    frequencyOverridesAmmo: boolean = false;
    frequencyOverridesLogic: boolean = false;
    logicOverridesAmmo: boolean = false;
    logicOverridesFrequency: boolean = false;

    switchGfxBlobName: string = "";
    switchGfxBlobId: string = "";
    lightPermutation: number = 0;
    paletteOffset: number = 0;
    hue: number = 0;
    saturation: number = 0;
    value: number = 0;
    animationTime: number = 0;

    switchSoundBlobName: string = "";
    switchSoundBlobId: string = "";
    switchSoundSimultaneous: number = 0;

    constructor() {
        super(LioType.Switch);
    }
}

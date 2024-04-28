import { LioEntry, LioType } from "./lio";

export class LioFlag extends LioEntry {
    oddsOfAppearance: number = 0;
    minPlayerCount: number = 0;
    maxPlayerCount: number = 0;

    friendlyOwnedFlagPlayerVisibility: number = 0;
    enemyOwnedFlagPlayerVisibility: number = 0;
    unownedFlagPlayerVisibility: number = 0;
    ownedFlagSpectatorVisibility: number = 0;
    unownedFlagSpectatorVisibility: number = 0;

    friendlyFlagLos: number = 0;
    enemyFlagLos: number = 0;
    unownedFlagLos: number = 0;

    flagCarriable: number = 0;
    isFlagOwnedWhenCarried: boolean = false;
    isFlagOwnedWhenDropped: boolean = false;

    dropDelay: number = 0;
    dropDelayReset: number = 0;
    dropRadius: number = 0;

    transferMode: number = 0;

    periodicPointsReward: number = 0;
    periodicExperienceReward: number = 0;
    periodicCashReward: number = 0;

    pickupDelay: number = 0;

    flagOwnerSpecialRadius: number = 0;
    flagOwnerSpecialHealRate: number = 0;
    flagOwnerSpecialEnergyRate: number = 0;
    flagOwnerSpecialRepairRate: number = 0;
    flagOwnerSpecialShieldPercent: number = 0;

    flagGraphicRow: number = 0;
    turretrGroupId: number = 0;
    flagRelativeId: number = 0;
    skillLogic: string = "";

    flagDroppableTerrains: number[] = [];

    nonFlagOwnerSpecialRadius: number = 0;
    nonFlagOwnerSpecialHealRate: number = 0;
    nonFlagOwnerSpecialEnergyRate: number = 0;
    nonFlagOwnerSpecialRepairRate: number = 0;
    nonFlagOwnerSpecialShieldPercent: number = 0;

    flagGfxBlobName: string = "";
    flagGfxBlobId: string = "";

    lightPermutation: number = 0;
    paletteOffset: number = 0;
    hue: number = 0;
    saturation: number = 0;
    value: number = 0;
    animationTime: number = 0;

    soundPickupBlobName: string = "";
    soundPickupBlobId: string = "";
    soundPickupSimultaneous: number = 0;

    soundDropBlobName: string = "";
    soundDropBlobId: string = "";
    soundDropSimultaneous: number = 0;

    constructor() {
        super(LioType.Flag);
    }
}

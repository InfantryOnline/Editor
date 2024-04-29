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

    flagTerrainSettingsTerrain0: number = 0;
    flagTerrainSettingsTerrain1: number = 0;
    flagTerrainSettingsTerrain2: number = 0;
    flagTerrainSettingsTerrain3: number = 0;
    flagTerrainSettingsTerrain4: number = 0;
    flagTerrainSettingsTerrain5: number = 0;
    flagTerrainSettingsTerrain6: number = 0;
    flagTerrainSettingsTerrain7: number = 0;
    flagTerrainSettingsTerrain8: number = 0;
    flagTerrainSettingsTerrain9: number = 0;
    flagTerrainSettingsTerrain10: number = 0;
    flagTerrainSettingsTerrain11: number = 0;
    flagTerrainSettingsTerrain12: number = 0;
    flagTerrainSettingsTerrain13: number = 0;
    flagTerrainSettingsTerrain14: number = 0;
    flagTerrainSettingsTerrain15: number = 0;

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

import { ArrayField, CsvFragment, Field } from "../csv/field";

export class FlagDroppableTerrain extends CsvFragment {
    @Field(0)
    value: number = 0;
}

export class LioFlag extends CsvFragment {
    @Field(1)
    oddsOfAppearance: number = 0;

    @Field(2)
    minPlayerCount: number = 0;

    @Field(3)
    maxPlayerCount: number = 0;

    @Field(4)
    friendlyOwnedFlagPlayerVisibility: number = 0;

    @Field(5)
    enemyOwnedFlagPlayerVisibility: number = 0;

    @Field(6)
    unownedFlagPlayerVisibility: number = 0;

    @Field(7)
    ownedFlagSpectatorVisibility: number = 0;

    @Field(8)
    unownedFlagSpectatorVisibility: number = 0;

    @Field(9)
    friendlyFlagLos: number = 0;

    @Field(10)
    enemyFlagLos: number = 0;

    @Field(11)
    unownedFlagLos: number = 0;

    @Field(12)
    flagCarriable: number = 0;

    @Field(13)
    isFlagOwnedWhenCarried: boolean = false;

    @Field(14)
    isFlagOwnedWhenDropped: boolean = false;

    @Field(15)
    dropDelay: number = 0;

    @Field(16)
    dropDelayReset: number = 0;

    @Field(17)
    dropRadius: number = 0;

    @Field(18)
    transferMode: number = 0;

    @Field(19)
    periodicPointsReward: number = 0;

    @Field(20)
    periodicExperienceReward: number = 0;

    @Field(21)
    periodicCashReward: number = 0;

    @Field(22)
    pickupDelay: number = 0;

    @Field(23)
    flagOwnerSpecialRadius: number = 0;

    @Field(24)
    flagOwnerSpecialHealRate: number = 0;

    @Field(25)
    flagOwnerSpecialEnergyRate: number = 0;

    @Field(26)
    flagOwnerSpecialRepairRate: number = 0;

    @Field(27)
    flagOwnerSpecialShieldPercent: number = 0;

    @Field(28)
    flagGraphicRow: number = 0;

    @Field(29)
    turretrGroupId: number = 0;

    @Field(30)
    flagRelativeId: number = 0;

    @Field(31)
    skillLogic: string = "";

    @Field(32)
    @ArrayField<FlagDroppableTerrain>(FlagDroppableTerrain, 47)
    flagDroppableTerrains: FlagDroppableTerrain[] = [];

    @Field(33)
    nonFlagOwnerSpecialRadius: number = 0;

    @Field(34)
    nonFlagOwnerSpecialHealRate: number = 0;

    @Field(35)
    nonFlagOwnerSpecialEnergyRate: number = 0;

    @Field(36)
    nonFlagOwnerSpecialRepairRate: number = 0;

    @Field(37)
    nonFlagOwnerSpecialShieldPercent: number = 0;

    @Field(38)
    flagGfxBlobName: string = "";

    @Field(39)
    flagGfxBlobId: string = "";

    @Field(40)
    lightPermutation: number = 0;

    @Field(41)
    paletteOffset: number = 0;

    @Field(42)
    hue: number = 0;

    @Field(43)
    saturation: number = 0;

    @Field(44)
    value: number = 0;

    @Field(45)
    animationTime: number = 0;

    @Field(46)
    soundPickupBlobName: string = "";

    @Field(47)
    soundPickupBlobId: string = "";

    @Field(48)
    soundPickupSimultaneous: number = 0;

    @Field(49)
    soundDropBlobName: string = "";

    @Field(50)
    soundDropBlobId: string = "";

    @Field(51)
    soundDropSimultaneous: number = 0;
}

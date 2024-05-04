import { CsvFragment, Field } from "../csv/field";

export class LioHide extends CsvFragment {
    @Field(0)
    initialCount: number = 0;

    @Field(1)
    attemptDelay: number = 0;

    @Field(2)
    succeedDelay: number = 0;

    @Field(3)
    probability: number = 0;

    @Field(4)
    minPlayers: number = 0;

    @Field(5)
    maxPlayers: number = 0;

    @Field(6)
    minPlayerDistance: number = 0;

    @Field(7)
    maxPlayerDistance: number = 0;

    @Field(8)
    maxTypeInArea: number = 0;

    @Field(9)
    maxTypeInlevel: number = 0;

    @Field(10)
    hideId: number = 0;

    @Field(11)
    hideQuantity: number = 0;

    @Field(12)
    hideTurretGroup: number = 0;

    @Field(13)
    hideAnnounce: string = "";

    @Field(14)
    assignFrequency: number = 0;

    @Field(15)
    clumpRadius: number = 0;

    @Field(16)
    clumpQuantity: number = 0;

    @Field(17)
    turretSwitchedFrequency: number = 0;

    @Field(18)
    turretInverseState: number = 0;

    @Field(19)
    rtsStateNumber: number = 0;
}

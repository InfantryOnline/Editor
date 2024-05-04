import { CsvFragment, Field } from "../csv/field";

export enum WarpMode {
    Anybody,
    Unassigned,
    SpecificTeam,
    TeamMultiple,
    SessionMultiple,
}

export class LioWarpField extends CsvFragment {
    @Field(0)
    minPlayerCount: number = 0;

    @Field(1)
    maxPlayerCount: number = 0;

    @Field(2)
    minPlayersInArea: number = 0;

    @Field(3)
    maxPlayersInArea: number = 0;

    @Field(4)
    warpGroup: number = 0;

    @Field(5)
    warpMode: WarpMode = WarpMode.Anybody;

    @Field(6)
    warpModeParameter: number = 0;

    @Field(7)
    skillLogic: string = "";
}

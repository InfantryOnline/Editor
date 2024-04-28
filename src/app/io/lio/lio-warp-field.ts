import { LioEntry, LioType } from "./lio";

export enum WarpMode {
    Anybody,
    Unassigned,
    SpecificTeam,
    TeamMultiple,
    SessionMultiple,
}

export class WarpField extends LioEntry {
    minPlayerCount: number = 0;
    maxPlayerCount: number = 0;
    minPlayersInArea: number = 0;
    maxPlayersInArea: number = 0;
    warpGroup: number = 0;
    warpMode: WarpMode = WarpMode.Anybody;
    warpModeParameter: number = 0;
    skillLogic: string = "";

    constructor() {
        super(LioType.WarpField);
    }
}

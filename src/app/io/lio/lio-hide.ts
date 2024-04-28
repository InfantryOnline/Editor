import { LioEntry, LioType } from "./lio";

export class LioHide extends LioEntry {
    initialCount: number = 0;
    attemptDelay: number = 0;
    succeedDelay: number = 0;
    probability: number = 0;
    minPlayers: number = 0;
    maxPlayers: number = 0;
    minPlayerDistance: number = 0;
    maxPlayerDistance: number = 0;
    maxTypeInArea: number = 0;
    maxTypeInlevel: number = 0;

    hideId: number = 0;
    hideQuantity: number = 0;
    hideTurretGroup: number = 0;
    hideAnnounce: string = "";

    assignFrequency: number = 0;
    clumpRadius: number = 0;
    clumpQuantity: number = 0;
    turretSwitchedFrequency: number = 0;
    turretInverseState: number = 0;
    rtsStateNumber: number = 0;

    constructor() {
        super(LioType.Hide);
    }
}

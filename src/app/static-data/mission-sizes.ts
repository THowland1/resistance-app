import { MissionSize } from "src/models/mission-size";

export module MissionSizes {
    export function allMissionSizes(noOfPlayers: number): MissionSize[] {
        return this.Regular[noOfPlayers];
      }

    export const Regular: {[numberOfPlayers: number]: MissionSize[] } = {
        5: [{size: 2}, {size: 3}, {size: 2}, {size: 3}, {size: 3}],
        6: [{size: 2}, {size: 3}, {size: 4}, {size: 3}, {size: 4}],
        7: [{size: 2}, {size: 3}, {size: 3}, {size: 4, twoFail: true}, {size: 4}],
        8: [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}],
        9: [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}],
        10: [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}]
    }

    export const Hunter = Regular;
}
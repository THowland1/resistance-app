import { MissionSize } from "./models/mission-size";

export const gameVariables = {
    minPlayers: 5,
    maxPlayers: 10,
    noOfMissionsPerGame: 5,
    noOfMissionsToWin: 3,
    maxNoOfVotesPerMission: 5,
    missionSizes: [
        [{size: 2}, {size: 3}, {size: 2}, {size: 3}, {size: 3}],
        [{size: 2}, {size: 3}, {size: 4}, {size: 3}, {size: 4}],
        [{size: 2}, {size: 3}, {size: 3}, {size: 4, twoFail: true}, {size: 4}],
        [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}],
        [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}],
        [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}]
      ] as MissionSize[][]
};
import { Stage } from "src/enums/stage.enum";
import { GameType } from "src/enums/game-type";
import { MissionCard } from "src/enums/mission-card";
import { MissionOutcome } from "src/enums/mission-outcome";
import { gameVariables } from "src/game.variables";
import { Vote } from "src/enums/vote.enum";

export interface Game {
    stage: Stage,
    startTime: number,
    team: boolean[],
    votes: Vote[],
    missionOutcomes: MissionOutcome[],
    currentMission: number,
    noOfDownvotedTeams: number,
    leader: number,
    gameType: GameType,
    playedCards: MissionCard[],
    wait: boolean,
    investigator?: boolean[]
  }

export function newGame(gameType: GameType) {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    team: [],
    votes: [],
    missionOutcomes: Array(gameVariables.noOfMissionsPerGame).fill(MissionOutcome.notStarted),
    currentMission: 0,
    noOfDownvotedTeams: 0,
    leader: null,
    gameType: gameType,
    playedCards: [],
    wait: false
  }

  if (gameType === GameType.hunter) {
    newGame.investigator = [];
  }

  return newGame;
}

// [TODO] - add reset functions
import { Stage } from "src/enums/stage.enum";
import { GameType } from "src/enums/game-type";
import { MissionCard } from "src/enums/mission-card";
import { MissionOutcome } from "src/enums/mission-outcome";
import { gameVariables } from "src/game.variables";

export interface Game {
    stage: Stage,
    startTime: number,
    team: boolean[],
    votes: boolean[],
    missionOutcomes: MissionOutcome[],
    currentMission: number,
    leader: number,
    gameType: GameType,
    playedCards: MissionCard[],
    wait: boolean
  }

export type GameProperty = 'stage' | 'startTime' | 'team' | 'votes' | 'missionOutcomes' | 'currentMission' | 'leader' | 'gameType' | 'playedCards' | 'wait';

export function newGame() {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    team: [],
    votes: [],
    missionOutcomes: Array(gameVariables.noOfMissionsPerGame).fill(MissionOutcome.notStarted),
    currentMission: 0,
    leader: null,
    gameType: GameType.regular, // TODO: make this customisable
    playedCards: [],
    wait: false
  }
  return newGame;
}
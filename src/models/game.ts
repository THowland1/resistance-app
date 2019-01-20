import { Stage } from "src/enums/stage.enum";
import { GameType } from "src/enums/game-type";
import { MissionCard } from "src/enums/mission-card";

export interface Game {
    stage: Stage,
    startTime: number,
    team: boolean[],
    votes: boolean[],
    leader: number,
    gameType: GameType,
    playedCards: MissionCard[],
    wait: boolean
  }

export type GameProperty = 'stage' | 'startTime' | 'team' | 'votes' | 'leader' | 'gameType' | 'playedCards' | 'wait';

export function newGame() {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    team: [],
    votes: [],
    leader: null,
    gameType: GameType.regular, // TODO: make this customisable
    playedCards: [],
    wait: false
  }
  return newGame;
}
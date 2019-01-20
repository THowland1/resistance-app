import { Stage } from "src/enums/stage.enum";
import { GameType } from "src/enums/game-type";

export interface Game {
    stage: Stage,
    startTime: number,
    team: boolean[],
    votes: boolean[],
    leader: number,
    gameType: GameType,
    wait: boolean
  }

export type GameProperty = 'stage' | 'startTime' | 'team' | 'votes' | 'leader' | 'gameType' | 'wait';

export function newGame() {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    team: [],
    votes: [],
    leader: null,
    gameType: GameType.regular, // TODO: make this customisable
    wait: false
  }
  return newGame;
}
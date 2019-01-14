import { Stage } from "src/enums/stage.enum";

export interface Game {
    stage: Stage,
    startTime: number,
    votes: boolean[]
  }

export type GameProperty = 'stage' | 'startTime' | 'votes';

export function newGame() {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    votes: []
  }
  return newGame;
}
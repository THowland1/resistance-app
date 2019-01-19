import { Stage } from "src/enums/stage.enum";

export interface Game {
    stage: Stage,
    startTime: number,
    team: boolean[],
    votes: boolean[]
  }

export type GameProperty = 'stage' | 'startTime' | 'team' | 'votes';

export function newGame() {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    team: [],
    votes: []
  }
  return newGame;
}
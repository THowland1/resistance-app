import { Stage } from "src/enums/stage.enum";

export interface Game {
    stage: Stage,
    startTime: number,
    team: boolean[],
    votes: boolean[],
    leader: number,
    wait: boolean
  }

export type GameProperty = 'stage' | 'startTime' | 'team' | 'votes' | 'leader' | 'wait';

export function newGame() {
  const newGame: Game = {
    stage: Stage.NotBegun,
    startTime: null,
    team: [],
    votes: [],
    leader: null,
    wait: false
  }
  return newGame;
}
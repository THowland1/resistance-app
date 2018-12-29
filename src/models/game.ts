import { Stage } from "src/enums/stage.enum";

export interface Game {
    stage: Stage,
    startTime: number
  }

export type GameProperty = 'stage' | 'startTime';
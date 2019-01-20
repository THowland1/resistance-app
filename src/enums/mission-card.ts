import { GameType } from "./game-type";

export enum MissionCard {
    none = 0,
    pass = 1,
    fail = 2
}

export interface IMissionCard {
    enumValue: MissionCard
    name: string
}

export const missionCards: IMissionCard[] = [
    {enumValue: MissionCard.none, name: 'N/A'},
    {enumValue: MissionCard.pass, name: 'Pass'},
    {enumValue: MissionCard.fail, name: 'Fail'}
]

export function cardsInPlay(gameType: GameType): MissionCard[] {
    switch (gameType) {
        case GameType.regular:
            return [MissionCard.pass,MissionCard.fail];    
        default:
            console.error('Game must have a game type')
            return [];
    }
}
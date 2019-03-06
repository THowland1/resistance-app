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

export function cardsInPlay(gameType: GameType): IMissionCard[] {
    let playableCards: MissionCard[];

    switch (gameType) {
        case GameType.regular:
            playableCards = [MissionCard.pass, MissionCard.fail];
            break;    
        default:
            console.error('Game must have a game type');
            playableCards = [];
    }

    return playableCards.map((enumValue) => missionCards[enumValue])
}
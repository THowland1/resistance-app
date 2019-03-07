import { GameType } from "./game-type";

export enum MissionCard {
    none = 0,
    pass = 1,
    fail = 2,
    chiefFail = 3
}

export interface IMissionCard {
    enumValue: MissionCard
    name: string
}

export const missionCards: IMissionCard[] = [
    {enumValue: MissionCard.none, name: 'N/A'},
    {enumValue: MissionCard.pass, name: 'Pass'},
    {enumValue: MissionCard.fail, name: 'Fail'},
    {enumValue: MissionCard.chiefFail, name: 'Chief Fail'}
]

export function cardsInPlay(gameType: GameType): IMissionCard[] {
    let playableCards: MissionCard[];

    switch (gameType) {
        case GameType.regular:
            playableCards = [MissionCard.pass, MissionCard.fail];
            break;   
        case GameType.hunter:
            playableCards = [MissionCard.pass, MissionCard.fail,MissionCard.chiefFail];
            break;   
        default:
            console.error('Game must have a game type');
            playableCards = [];
    }

    return playableCards.map((enumValue) => missionCards[enumValue])
}

// [TODO-HUNTER] - 11 - Add canPlay function to use in mission component
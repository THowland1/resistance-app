import { GameType } from "./game-type";
import { Player } from "src/models/player";
import { Team } from "./team.enum";
import { Role } from "./role.enum";

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
            playableCards = [MissionCard.pass, MissionCard.fail, MissionCard.chiefFail];
            break;   
        default:
            console.error('Game must have a game type');
            playableCards = [];
    }

    return playableCards.map((enumValue) => missionCards[enumValue])
}

export function canPlayCard(missionCard: MissionCard, player: Player): boolean {
    const resistanceCards = [MissionCard.pass];
    const spyRegularCards = [MissionCard.pass, MissionCard.fail];
    const spyChiefCards = [MissionCard.pass, MissionCard.chiefFail];

    var playableCards: MissionCard[] = [];

    if (player.team === Team.resistance) {
        playableCards = resistanceCards;
    } else if (player.team === Team.spy) {
        if (player.role === Role.chief) {
            playableCards = spyChiefCards;
        } else {
            playableCards = spyRegularCards;
        }
    }

    return playableCards.includes(missionCard);
}

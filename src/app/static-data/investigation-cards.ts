import { InvestigationCard } from "src/enums/investigation-card.enum";

export module InvestigationCards {
    // [TODO] - Add something to allow the game-starter to shoose team or not
    export interface IInvestigationCard {
        message: string
    }

    const NotAChief: IInvestigationCard = {
        message: 'Not a Chief!'
    }

    const ResistanceChief: IInvestigationCard = {
        message: 'Resistance Chief!'
    }

    const SpyChief: IInvestigationCard = {
        message: 'Spy Chief!'
    }

    const AChief: IInvestigationCard = {
        message: 'A Chief!'
    }

    export const investigationCards: {[enumValue: number]: IInvestigationCard} = {};
    investigationCards[InvestigationCard.NotAChief] = NotAChief;
    investigationCards[InvestigationCard.ResistanceChief] = ResistanceChief;
    investigationCards[InvestigationCard.SpyChief] = SpyChief;
    investigationCards[InvestigationCard.AChief] = AChief;
    }
    
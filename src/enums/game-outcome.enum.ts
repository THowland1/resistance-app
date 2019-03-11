import { Team } from "./team.enum";

export enum GameOutcome {
    sufficientSuccesses = 0,
    sufficientFailures = 1,
    tooManyDownvotes = 2,
    spyChiefKilled = 3,
    resistanceChiefKilled = 4
}

export function GameOutcomeMessagePipe(gameOutcome: GameOutcome): string {
    switch (gameOutcome) {
        case GameOutcome.sufficientSuccesses:
            return 'The missions have succeeded';
        case GameOutcome.sufficientFailures:
            return 'The missions have failed';    
        case GameOutcome.tooManyDownvotes:
            return 'Too many teams were downvoted';
        case GameOutcome.spyChiefKilled:
            return 'The spy chief has been eliminated'; 
        case GameOutcome.resistanceChiefKilled:
            return 'The resistance chief has been eliminated'; 
        default:
            console.error('An error has occurred')
            return 'An error has occurred';
    }
}
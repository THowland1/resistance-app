import { Team } from "./team.enum";

export enum GameOutcome {
    sufficientSuccesses = 0,
    sufficientFailures = 1,
    tooManyDownvotes = 2
}

export function GameOutcomeWinnerPipe(gameOutcome: GameOutcome): Team {
    var resistanceWins = [GameOutcome.sufficientSuccesses];
    var spyWins = [GameOutcome.sufficientFailures, GameOutcome.tooManyDownvotes];

    if (resistanceWins.some((outcome) => outcome === gameOutcome)) {
        return Team.resistance;
    } else if (spyWins.some((outcome) => outcome === gameOutcome)) {
        return Team.spy;
    } else {
        console.error('An error has occurred');
        return Team.unassigned;
    }
}

export function GameOutcomeMessagePipe(gameOutcome: GameOutcome): string {
    switch (gameOutcome) {
        case GameOutcome.sufficientSuccesses:
            return 'The missions have succeeded';
        case GameOutcome.sufficientFailures:
            return 'The missions have failed';    
        case GameOutcome.tooManyDownvotes:
            return 'Too many teams were downvoted';    
        default:
            console.error('An error has occurred')
            return 'An error has occurred';
    }
}
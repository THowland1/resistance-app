import { map } from "rxjs/operators";
import { Game } from "./models/game";
import { Team } from "./enums/team.enum";
import { MissionOutcome } from "./enums/mission-outcome";
import { gameVariables } from "./game.variables";
import { Role } from "./enums/role.enum";
import { MissionCard } from "./enums/mission-card";
import { Player } from "./models/player";
import { GameType } from "./enums/game-type";
import { GameOutcome } from "./enums/game-outcome.enum";

declare global {
    interface Array<T> {
        /**
         * Randomise every element in the array
         */
        shuffle(): Array<T>;
    }
}

Array.prototype.shuffle = function() {
    let currentIndex = this.length
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = this[currentIndex];
      this[currentIndex] = this[randomIndex];
      this[randomIndex] = temporaryValue;
    }
  
    return this;
}

/**
 * Creates a callback function for a subscription.
 * The given object's property will be updated with the value from the subscription.
 * @param obj  The object on which the property exists.
 * @param prop  The property to be updated.
 * @returns       A callback function to update the object's property with the callback's input.
 */
export function bind<T,K extends keyof T>(obj: T,prop:K): (value: T[K]) => void {
    return (value: T[K]) => {obj[prop] = value};
}


export function log<T>() {
    return map((value: T) => {
        console.log(value);
        return value;
    });
}



export function randomInt(max: number){
    const randomInt = Math.floor(Math.random()*(max+1));

    if (randomInt > max) { // if Math.random() returns exactly 1
      return max;
    }
    return randomInt;
}

export function allEnumValues(enumObject: Object): number[] {
    const keys = Object.keys(enumObject).filter(key => !isNaN(Number(enumObject[key])));
    const values = keys.map((key) => enumObject[key]);
    return values;
}

export module Hunt {
      export function huntingTeam(game: Game): Team {
        const missionOutcomes = game.missionOutcomes;
    
        const noOfPassingMissions = missionOutcomes.filter((outcome) => outcome === MissionOutcome.pass).length;
        const noOfFailingMissions = missionOutcomes.filter((outcome) => outcome === MissionOutcome.fail).length;
        const didTheMissionChiefFail = didItChiefFail(game);
    
        var huntingTeam: Team;
        if (noOfPassingMissions === gameVariables.noOfMissionsToWin) {
          huntingTeam = Team.resistance;
        } else if (noOfFailingMissions === gameVariables.noOfMissionsToWin || didTheMissionChiefFail) {
          huntingTeam = Team.spy;
        } else {
          huntingTeam = Team.unassigned;
        }
        return huntingTeam;
      }

      function didItChiefFail(game: Game): boolean {
        const playedCards = game.playedCards;
        return playedCards.includes(MissionCard.chiefFail);
      }
}

export module GameOver {
    // Universal functions
    export function isGameOver(game: Game, players: Player[]) {
        switch (game.gameType) {
            case GameType.regular:
              return isGameOver_regular(game);
            case GameType.hunter:
              return isGameOver_hunter(game, players);
            default:
              this._modalService.error('Internal Error', 'Game must have a gameType');
              return false;
          }
    };

    export function winningTeam(game: Game, players: Player[]): Team {
        switch (game.gameType) {
            case GameType.regular:
              return winningTeam_regular(game);
            case GameType.hunter:
              return winningTeam_hunter(game, players);
            default:
              this._modalService.error('Internal Error', 'Game must have a gameType');
              return Team.unassigned;
          }
    };

    export function gameOutcome(game: Game, players: Player[]): GameOutcome {
        switch (game.gameType) {
            case GameType.regular:
              return gameOutcome_regular(game);
            case GameType.hunter:
              return gameOutcome_hunter(game, players);
            default:
              this._modalService.error('Internal Error', 'Game must have a gameType');
              return null;
          }
    };

    // Mode-dependent functions
    function isGameOver_regular(game: Game): boolean {
        return tooManyDownvotes(game)
            || sufficientFailures(game)
            || sufficientSuccesses(game);
    }

    function isGameOver_hunter(game: Game, players: Player[]): boolean {
        return tooManyDownvotes(game)
            || resistanceChiefKilled(game, players)
            || spyChiefKilled(game, players);
    }

    function winningTeam_regular(game: Game): Team {
        const resistanceWinConditions = [sufficientSuccesses(game)];
        const spyWinConditions = [tooManyDownvotes(game), sufficientFailures(game)];

        if (resistanceWinConditions.some((condition) => condition == true)) {
            return Team.resistance;
        } else if (spyWinConditions.some((condition) => condition == true)) {
            return Team.spy;
        } else {
            return Team.unassigned;
        }
    }

    function winningTeam_hunter(game: Game, players: Player[]): Team {
        const resistanceWinConditions = [spyChiefKilled(game, players)];
        const spyWinConditions = [tooManyDownvotes(game), resistanceChiefKilled(game, players)];

        if (resistanceWinConditions.some((condition) => condition == true)) {
            return Team.resistance;
        } else if (spyWinConditions.some((condition) => condition == true)) {
            return Team.spy;
        } else {
            return Team.unassigned;
        }
    }

    function gameOutcome_regular(game: Game): GameOutcome {
        if (tooManyDownvotes(game)) { return GameOutcome.tooManyDownvotes; }
        else if (sufficientFailures(game)) { return GameOutcome.sufficientFailures; }
        else if (sufficientSuccesses(game)) { return GameOutcome.sufficientSuccesses; }
        else { return null;}
    }

    function gameOutcome_hunter(game: Game, players: Player[]): GameOutcome {
        if (tooManyDownvotes(game)) { return GameOutcome.tooManyDownvotes; }
        else if (resistanceChiefKilled(game, players)) { return GameOutcome.resistanceChiefKilled; }
        else if (spyChiefKilled(game, players)) { return GameOutcome.spyChiefKilled; }
        else { return null;}
    }

    // Win conditions
    function tooManyDownvotes(game: Game): boolean {
        return game.noOfDownvotedTeams >= gameVariables.maxNoOfVotesPerMission;
    }

    function sufficientFailures(game: Game): boolean {
        var noOfFails = game.missionOutcomes.filter((outcome) => outcome === MissionOutcome.fail).length;
        return noOfFails > gameVariables.noOfMissionsToWin;
    }

    function sufficientSuccesses(game: Game): boolean {
        var noOfSuccesses = game.missionOutcomes.filter((outcome) => outcome === MissionOutcome.pass).length;
        return noOfSuccesses > gameVariables.noOfMissionsToWin;
    }

    function spyChiefKilled(game: Game, players: Player[]): boolean {
        if (Hunt.huntingTeam(game) !== Team.resistance) {
            return false;
        }
        const isPlayerSpyChiefArray = players.map((player) => player.team === Team.spy && player.role === Role.chief)
        const isHuntedPlayerSpyChief = isPlayerSpyChiefArray[game.hunted];
        return isHuntedPlayerSpyChief;
    }

    function resistanceChiefKilled(game: Game, players: Player[]): boolean {
        if (Hunt.huntingTeam(game) !== Team.spy) {
            return false;
        }
        const isPlayerResistanceChiefArray = players.map((player) => player.team === Team.resistance && player.role === Role.chief)
        const isHuntedPlayerResistanceChief = isPlayerResistanceChiefArray[game.hunted];
        return isHuntedPlayerResistanceChief;
    }

}
import { Player } from "src/models/player";
import { RoleCards } from "./role-cards";
import { GameType } from "src/enums/game-type";

export module RoleDistribution {
    interface IRoleDistribution {
        roleCard: Player,
        amount: number
    }

    export function allRoles(gameType: GameType, noOfPlayers: number): Player[] {
        let allPlayers: Player[] = [];
        const roleDistributions = AllRoleDistributions[gameType][noOfPlayers];
        roleDistributions.forEach((roleDistribution) => {
          const players = Array<Player>(roleDistribution.amount).fill(roleDistribution.roleCard);
          allPlayers = allPlayers.concat(players);
        })
    
        if (allPlayers.length !== noOfPlayers) { 
          alert('wrong number of players');
        }
    
        return allPlayers;
      }

    const Regular: {[numberOfPlayers: number]: IRoleDistribution[] } = {
        5: [
            {roleCard: RoleCards.ResistancePlain, amount: 3},
            {roleCard: RoleCards.SpyPlain, amount: 2}
        ],
        6: [
            {roleCard: RoleCards.ResistancePlain, amount: 4},
            {roleCard: RoleCards.SpyPlain, amount: 2}
        ],
        7: [
            {roleCard: RoleCards.ResistancePlain, amount: 4},
            {roleCard: RoleCards.SpyPlain, amount: 3}
        ],
        8: [
            {roleCard: RoleCards.ResistancePlain, amount: 5},
            {roleCard: RoleCards.SpyPlain, amount: 3}
        ],
        9: [
            {roleCard: RoleCards.ResistancePlain, amount: 6},
            {roleCard: RoleCards.SpyPlain, amount: 3}
        ],
        10: [
            {roleCard: RoleCards.ResistancePlain, amount: 6},
            {roleCard: RoleCards.SpyPlain, amount: 4}
        ],
    }

    const Hunter: {[numberOfPlayers: number]: IRoleDistribution[] } = {
        5: [
            {roleCard: RoleCards.ResistancePlain, amount: 1},
            {roleCard: RoleCards.ResistanceHunter, amount: 1},
            {roleCard: RoleCards.ResistanceChief, amount: 1},
            {roleCard: RoleCards.SpyHunter, amount: 1},
            {roleCard: RoleCards.SpyChief, amount: 1}
        ],
        6: [
            {roleCard: RoleCards.ResistancePlain, amount: 2},
            {roleCard: RoleCards.ResistanceHunter, amount: 1},
            {roleCard: RoleCards.ResistanceChief, amount: 1},
            {roleCard: RoleCards.SpyHunter, amount: 1},
            {roleCard: RoleCards.SpyChief, amount: 1}
        ],
        7: [
            {roleCard: RoleCards.ResistancePlain, amount: 2},
            {roleCard: RoleCards.ResistanceHunter, amount: 1},
            {roleCard: RoleCards.ResistanceChief, amount: 1},
            {roleCard: RoleCards.SpyPlain, amount: 1},
            {roleCard: RoleCards.SpyHunter, amount: 1},
            {roleCard: RoleCards.SpyChief, amount: 1}
        ],
        8: [
            {roleCard: RoleCards.ResistancePlain, amount: 2},
            {roleCard: RoleCards.ResistanceHunter, amount: 1},
            {roleCard: RoleCards.ResistanceChief, amount: 2},
            {roleCard: RoleCards.SpyPlain, amount: 1},
            {roleCard: RoleCards.SpyHunter, amount: 1},
            {roleCard: RoleCards.SpyChief, amount: 1}
        ],
        9: [
            {roleCard: RoleCards.ResistancePlain, amount: 3},
            {roleCard: RoleCards.ResistanceHunter, amount: 1},
            {roleCard: RoleCards.ResistanceChief, amount: 2},
            {roleCard: RoleCards.SpyPlain, amount: 1},
            {roleCard: RoleCards.SpyHunter, amount: 1},
            {roleCard: RoleCards.SpyChief, amount: 1}
        ],
        10: [
            {roleCard: RoleCards.ResistancePlain, amount: 3},
            {roleCard: RoleCards.ResistanceHunter, amount: 1},
            {roleCard: RoleCards.ResistanceChief, amount: 2},
            {roleCard: RoleCards.SpyPlain, amount: 1},
            {roleCard: RoleCards.SpyHunter, amount: 1},
            {roleCard: RoleCards.SpyChief, amount: 2}
        ],
    }

    const AllRoleDistributions = {};
    AllRoleDistributions[GameType.regular] = Regular;
    AllRoleDistributions[GameType.hunter] = Hunter;

}

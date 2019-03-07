import { Player } from "src/models/player";
import { RoleCards } from "./role-cards";

export module RoleDistribution {
    interface IRoleDistribution {
        roleCard: Player,
        amount: number
    }

    type ModuleType = 'Regular' | 'Hunter';

    export function allRoles(moduleType: ModuleType, noOfPlayers: number): Player[] {

        let allPlayers: Player[] = [];
        const roleDistributions = this[moduleType][noOfPlayers]
        roleDistributions.forEach((roleDistribution) => {
          const players = Array<Player>(roleDistribution.amount).fill(roleDistribution.roleCard);
          allPlayers = allPlayers.concat(players);
        })
    
        if (allPlayers.length !== noOfPlayers) { 
          alert('wrong number of players');
        }
    
        return allPlayers;
      }

      // [TODO-HUNTER] - 03 - Add Hunter Role distributions
    export const Regular: {[numberOfPlayers: number]: IRoleDistribution[] } = {
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

}

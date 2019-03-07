import { Team } from "src/enums/team.enum";
import { Role } from "src/enums/role.enum";

export interface Player {
    name: string,
    team: Team,
    role: Role
}

export function newPlayer(name: string): Player {
    const newPlayer: Player = {
        name,
        team: Team.unassigned,
        role: Role.unassigned
    };
    return newPlayer;
  }
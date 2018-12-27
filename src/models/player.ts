import { Team } from "src/enums/team.enum";
import { Role } from "src/enums/role.enum";

export interface Player {
    name: string,
    team: Team,
    role: Role
}

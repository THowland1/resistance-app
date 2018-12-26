import { Team } from "src/enums/team.enum";
import { Role } from "src/enums/role.enum";

export interface Player {
    team: Team,
    role: Role
}

import { BaseModalData } from "../base-modal-data";
import { Team } from "src/enums/team.enum";
import { Role } from "src/enums/role.enum";
import { Player } from "src/models/player";
export interface RoleCardModalData extends BaseModalData {
    team: Team;
    role: Role;
    fellowSpies?: Player[];
}
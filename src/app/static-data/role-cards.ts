import { Role } from "src/enums/role.enum";
import { Team } from "src/enums/team.enum";
import { Player } from "src/models/player";

export module RoleCards {
    export const None: Player = {
        name: null,
        role:Role.unassigned,
        team:Team.unassigned
    };
    export const ResistancePlain: Player = {
        name: null,
        team:Team.resistance,
        role:Role.regular
    };
    export const SpyPlain: Player = {
        name: null,
        team:Team.spy,
        role:Role.regular
    };
    export const ResistanceHunter: Player = {
        name: null,
        team:Team.resistance,
        role:Role.hunter
    };
    export const ResistanceChief: Player = {
        name: null,
        team:Team.resistance,
        role:Role.chief
    };
    export const SpyHunter: Player = {
        name: null,
        team:Team.spy,
        role:Role.hunter
    };
    export const SpyChief: Player = {
        name: null,
        team:Team.spy,
        role:Role.chief
    };
}
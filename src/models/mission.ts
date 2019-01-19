export interface Mission {
    leader: number
}

export type MissionProperty = 'leader';

export function newMission(leader: number) {
    const newMission: Mission = {
        leader
    }
    return newMission;
}


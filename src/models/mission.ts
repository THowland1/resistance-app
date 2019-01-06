export interface Mission {
    leader: number,
    team: number
}

export type MissionProperty = 'leader' | 'team';

export function newMission(leader: number) {
    const newMission: Mission = {
        leader,
        team: null
    }
    return newMission;
}


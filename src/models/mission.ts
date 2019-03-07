export interface Mission {
    downvotedTeams: number[],
    downvotedVotes: number[]
    leader: number
}

export function newMission() {
    const newMission: Mission = {
        downvotedTeams: [],
        downvotedVotes: [],
        leader: null
    }
    return newMission;
}


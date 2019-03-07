export enum Stage {
    NotBegun = 0,
    RoleReveal = 1,
    TeamPick = 2,
    Vote = 3,
    Mission = 4,
    Reveal = 5,
    GameOver = 6,
    Investigation = 7,
    Hunt = 8
}

export function stageUrlPipe(stage: Stage): string {
    switch (stage) {
        case Stage.NotBegun:
            return ''
        case Stage.RoleReveal:
            return 'role-reveal'
        case Stage.TeamPick:
            return 'team-pick'
        case Stage.Vote:
            return 'vote'
        case Stage.Mission:
            return 'mission'
        case Stage.Reveal:
            return 'reveal'
        case Stage.GameOver:
            return 'game-over'
        case Stage.Investigation:
            return 'investigation'
        case Stage.Hunt:
            return 'hunt'
        default:
            break;
    }
}
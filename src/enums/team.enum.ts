export enum Team {
    unassigned = 0,
    resistance = 1,
    spy = 2
}

export function teamPipe(team: Team): string {
    switch (team) {
      case Team.unassigned:
        return '(unassigned)';
      case Team.resistance:
        return 'Resistance';
      case Team.spy:
        return 'Spy';
      default:
        return '(ERROR)';
    }
  }
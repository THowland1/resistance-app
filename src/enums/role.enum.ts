export enum Role {
    unassigned = 0,
    regular = 1
}

export function rolePipe(role: Role): string {
    switch (role) {
      case Role.unassigned:
        return '(unassigned)';
      case Role.regular:
        return '(regular)';
      default:
        return '(ERROR)';
    }
  }
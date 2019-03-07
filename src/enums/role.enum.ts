export enum Role {
    unassigned = 0,
    regular = 1,
    hunter = 2,
    chief = 3
}

export function rolePipe(role: Role): string {
    switch (role) {
      case Role.unassigned:
        return '(unassigned)';
      case Role.regular:
        return '(regular)';
      case Role.hunter:
        return 'hunter';
        case Role.regular:
        return 'chief';
      default:
        return '(ERROR)';
    }
  }
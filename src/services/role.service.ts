import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Player } from 'src/models/player';
import { Role } from 'src/enums/role.enum';
import { Team } from 'src/enums/team.enum';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private base: BaseService) { }

  assignRoles(): void {
    this.base.getPlayers()
      .pipe(first())
      .subscribe((players) => {
        let unassignedPlayers = players;
        let allRoles = this.allRoles(players.length);

        while (unassignedPlayers.length > 0) {
          const whichPlayerIndexToAssign = this.randomInt(unassignedPlayers.length-1);
          const roleToAssign = allRoles.pop();
          const whichPlayerToAssign = unassignedPlayers.splice(whichPlayerIndexToAssign,1)[0];

          this.base.updatePlayerProperty('role',roleToAssign.role,whichPlayerToAssign.name);
          this.base.updatePlayerProperty('team',roleToAssign.team,whichPlayerToAssign.name);
        }
    })
  }

  currentPlayers(): Observable<Player[]> {
    return this.base.getPlayers();
  }

  private randomInt(max: number){
    const randomInt = Math.floor(Math.random()*(max+1));

    if (randomInt > max) { // if Math.random() returns exactly 1
      return max;
    }
    return randomInt;
  }

  private allRoles(noOfPlayers: number): Player[] {
    let roleArray = Array<Player>(noOfPlayers);
    let noOfEachTypeArray = [
      {noOfPlainResistance: 3, noOfPlainSpies: 2},
      {noOfPlainResistance: 4, noOfPlainSpies: 2},
      {noOfPlainResistance: 4, noOfPlainSpies: 3},
      {noOfPlainResistance: 5, noOfPlainSpies: 3},
      {noOfPlainResistance: 6, noOfPlainSpies: 3},
      {noOfPlainResistance: 6, noOfPlainSpies: 4}
    ]

    const noOfEachType = noOfEachTypeArray[noOfPlayers-5];

    const plainResistance: Player = {
      name: null,
      role: Role.regular,
      team: Team.resistance
    };
    const plainSpy: Player = {
      name: null,
      role: Role.regular,
      team: Team.spy
    }

    const allPlainResistance = Array<Player>(noOfEachType.noOfPlainResistance).fill(plainResistance);
    const allPlainSpies = Array<Player>(noOfEachType.noOfPlainSpies).fill(plainSpy);

    
    const allPlayers = allPlainResistance.concat(allPlainSpies)

    if (allPlayers.length !== noOfPlayers) { alert('wrong number of players')}

    return allPlayers;
  }
}

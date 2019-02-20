import { Component } from '@angular/core';
import { BaseModal } from '../base-modal';
import { RoleCardModalData } from './role-card-modal-data';
import { teamPipe, Team } from 'src/enums/team.enum';
import { rolePipe } from 'src/enums/role.enum';

@Component({
  selector: 'app-role-card-modal',
  templateUrl: './role-card-modal.component.html'
})
export class RoleCardModalComponent extends BaseModal<RoleCardModalComponent, RoleCardModalData> {
  get team(): string {
    return teamPipe(this.dialogData.team)
  }

  get role(): string {
    return rolePipe(this.dialogData.role)
  }
  
  get fellowSpies(): string[] {
    if(this.dialogData.team === Team.resistance || !this.dialogData.fellowSpies){
      return undefined;
    }
    return this.dialogData.fellowSpies.map((spy) => {
      return `${spy.name}: ${rolePipe(spy.role)}`
    })
  }
}
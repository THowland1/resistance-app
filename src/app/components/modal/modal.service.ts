import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { AlertModalComponent } from './alert/alert-modal.component';
import { AlertModalData } from './alert/alert-modal-data';
import { RoleCardModalComponent } from './role-card/role-card-modal.component';
import { RoleCardModalData } from './role-card/role-card-modal-data';
import { Team } from 'src/enums/team.enum';
import { Role } from 'src/enums/role.enum';
import { Player } from 'src/models/player';
import { ModalType } from './modal-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private matDialog: MatDialog) { }

  // Alert
  info(title: string, ...messages: string[]): MatDialogRef<AlertModalComponent> {
    return this._alert(ModalType.info,title,messages);
  }

  warn(title: string, messages: string[]): MatDialogRef<AlertModalComponent> {
    return this._alert(ModalType.warn,title,messages);
  }

  error(title: ErrorType, ...messages: string[]): MatDialogRef<AlertModalComponent> {
    return this._alert(ModalType.error,title,messages);
  }

  private _alert(modalType: ModalType, title: string, messages: string[]): MatDialogRef<AlertModalComponent> {
    const config = new MatDialogConfig<AlertModalData>();
    config.data = {
      modalType,
      title,
      messages
    }
    return this.matDialog.open(AlertModalComponent, config);
  }

  // Card Reveal
  roleCard(team: Team, role: Role, fellowSpies?: Player[]): MatDialogRef<RoleCardModalComponent> {
    const config = new MatDialogConfig<RoleCardModalData>();
    config.data = {
      modalType: ModalType.info,
      title: 'Your role',
      team,
      role,
      fellowSpies
    }
    return this.matDialog.open(RoleCardModalComponent, config);
  }

}

type ErrorType = 'Internal Error' | 'Illegal Action' | 'Join Failed';
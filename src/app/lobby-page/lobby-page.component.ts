import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LobbyModalComponent } from './lobby-modal/lobby-modal.component';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss']
})
export class LobbyPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private _loginService: LoginService) { }
  name: string;
  roomCode: string;
  @Output() joinedServer = new EventEmitter();
  
  ngOnInit() {
  }

  openDialog(isNew: boolean): void {
    const dialogRef = this.dialog.open(LobbyModalComponent, {
      width: '250px',
      data: {isNew:isNew}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log(result);
      isNew ? this.createNewLobby(result) : this.joinLobby(result)
    });
  }

  createNewLobby(result: any): void {
    alert('created new');
    this._loginService.createLobby(result.name);
    this.joinedServer.emit();
  }

  joinLobby(result: any): void {
    alert('joined one');
    this._loginService.joinLobby(result);
    this.joinedServer.emit();
  }
}

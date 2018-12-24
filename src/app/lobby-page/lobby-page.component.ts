import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LobbyModalComponent } from './lobby-modal/lobby-modal.component';
import { LoginService } from 'src/services/login.service';
import { Session } from 'src/models/session';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss']
})
export class LobbyPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private _loginService: LoginService) { }
  session: Session;
  @Output() joinedServer = new EventEmitter<Session>();
  
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
      isNew ? this.createAndJoinNewLobby(result) : this.joinLobby(result)
    });
  }

  createAndJoinNewLobby(result: Session): void {
    alert('created new');
    this._loginService.createLobby(result.name)
      .pipe(first<string>())
      .subscribe({
        next: (roomCode) => {
          result.roomCode = roomCode;
          this.joinLobby(result);
        },
        error: (err) => {alert(err)},
        complete: () => {alert('I finished')}
      });
  }

  joinLobby(result: Session): void {
    alert('joined one');

    this._loginService.joinLobby(result).subscribe({
      error: (err)=>{alert(err)},
      complete: ()=>{this.joinedServer.emit(result);}
    });

    
  }
}

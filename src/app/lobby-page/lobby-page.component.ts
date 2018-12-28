import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LobbyModalComponent } from './lobby-modal/lobby-modal.component';
import { LoginService } from 'src/services/login.service';
import { Session } from 'src/models/session';
import { first, takeUntil, map } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss']
})
export class LobbyPageComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private _loginService: LoginService,
    private _navService: NavService) { }

  minPlayers = 3;
  session: Session;
  canStartGame = false;
  lobbyPeople: string[] = [];
  isConnectedToARoom: boolean = false;
  private destroy$ = new Subject();

  @Output() joinedServer = new EventEmitter<Session>();
  
  ngOnInit() {
    this._navService.isConnectedToARoom$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConnected) => {
        console.log(isConnected);
        this.isConnectedToARoom = isConnected;
        if (isConnected) {
          this._navService.currentPlayers
            .pipe(
              takeUntil(this.destroy$),
              map((players) => players.map((player) => player.name)))
            .subscribe((players) => {
              this.lobbyPeople = players;
              this.canStartGame = players.length < this.minPlayers;
          })
        }
      });
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
    this._loginService.createLobby(result.name)
      .pipe(first<string>())
      .subscribe({
        next: (roomCode) => {
          result.roomCode = roomCode;
          this.joinLobby(result);
        },
        error: (err) => {alert(err)}
      });
  }

  joinLobby(result: Session): void {
    this._loginService.joinLobby(result).subscribe({
      error: (err)=>{alert(err)},
      complete: ()=>{this.joinedServer.emit(result);}
    });
  }

  startGame(): void {
    //this._navService.startGame();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LobbyModalComponent } from './lobby-modal/lobby-modal.component';
import { LoginService } from 'src/services/login.service';
import { Session } from 'src/models/session';
import { first, takeUntil, map, take } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Subject, BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { Stage } from 'src/enums/stage.enum';

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

  minPlayers = 1;
  session: Session;
  canStartGame = false;
  lobbyPeople: string[] = [];
  isConnectedToARoom: boolean = false;
  countDownTimer: number = null;
  private ticker = interval(1000);
  private destroy$ = new Subject();
  private countdownActive$ = new Subject();

  @Output() joinedServer = new EventEmitter<Session>();
  // make it so canstart game is responsive to hasenoughplayers and isalive
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

          this._navService.startTime
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe((startTime) => {
              if(!!startTime){
                //do the countdown
                this.ticker
                  .pipe(takeUntil(this.countdownActive$))
                  .subscribe(() => {
                    const currentTime = new Date().getTime();
                    const secondsRemaining =  Math.ceil((startTime - currentTime)/1000)
                    if(secondsRemaining > 0) {
                      this.countDownTimer = secondsRemaining;
                    } else {
                      this.countDownTimer = 0;
                      this._navService.goToStage(Stage.RoleReveal);
                    }
                  });
              } else {
                // cancel the countdown
                this.countdownActive$.next();
                this.countDownTimer = null;
              }
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
    this._navService.startGame();
  }

  cancelGame(): void {
    this._navService.cancel();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.countdownActive$.next();
    this.countdownActive$.complete();
  }
}

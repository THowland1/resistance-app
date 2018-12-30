import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginService } from 'src/services/login.service';
import { Session } from 'src/models/session';
import { first, takeUntil, map, take } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Subject, BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { Stage } from 'src/enums/stage.enum';
import { FormControl, Validators } from '@angular/forms';

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
  canStartGame = false;
  lobbyPeople: string[] = [];
  isConnectedToARoom: boolean = false;
  countDownTimer: number = null;
  isNew = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  roomCode = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
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

  get canCreateOrJoinLobby(): boolean {
    return this.name.invalid || (this.roomCode.invalid && !this.isNew);
  }

  createOrJoinLobby(): void {
    if (this.canCreateOrJoinLobby){
      this.name.markAsTouched();
      this.roomCode.markAsTouched();
      return;
    }

    const name = this.name.value;
    const roomCode = (this.roomCode.value as string).toUpperCase();

    this.isNew
      ? this.createAndJoinNewLobby(name)
      : this.joinLobby({name,roomCode});
  }

  createAndJoinNewLobby(name: string): void {
    this._loginService.createLobby(name)
      .pipe(first<string>())
      .subscribe({
        next: (roomCode) => {
          this.joinLobby({name, roomCode});
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

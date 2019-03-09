import { Component, OnInit } from '@angular/core';
import { first, takeUntil, map, mergeMap, tap, expand, take, withLatestFrom } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Subject, interval, Observable, iif, of, zip } from 'rxjs';
import { Stage } from 'src/enums/stage.enum';
import { FormControl, Validators } from '@angular/forms';
import { gameVariables } from 'src/game.variables'
import { SessionService } from 'src/services/session.service';
import { GameService } from 'src/services/game.service';
import { BaseService } from 'src/services/base.service';
import { Player, newPlayer } from 'src/models/player';
import { newGame } from 'src/models/game';
import { ModalService } from 'src/app/components/modal/modal.service';
import { allEnumValues } from 'src/functions';
import { GameType } from 'src/enums/game-type';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss']
})
export class LobbyPageComponent implements OnInit {

  constructor(
    private _baseService: BaseService,
    private _navService: NavService,
    private _sessionService: SessionService,
    private _gameService: GameService,
    public _modalService: ModalService) { }

  
  isConnectedToARoom: boolean = false;
  countDownTimer: number = null;
  isNew = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  roomCode = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  gameType = new FormControl(GameType.regular, [Validators.required]);
  private destroy$ = new Subject();

  gameTypes = allEnumValues(GameType);

  ngOnInit() {
    this._navService.isConnectedToARoom$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConnected) => {
        this.isConnectedToARoom = isConnected;
        if (isConnected) {
          this._load_gameType();
          this._bind_currentPlayers();
          this._bind_countdownTimer();
        }
      });
  }

  onCreateOrJoinLobbyClick(): void {
    if (!this.canCreateOrJoinLobby){
      this.name.markAsTouched();
      this.roomCode.markAsTouched();
      return;
    }

    const name = this.name.value;
    const roomCode = (this.roomCode.value as string).toUpperCase();

    this.isNew
      ? this.createLobby().subscribe((newRoomCode) => this.joinLobby(name, newRoomCode))
      : this.joinLobby(name, roomCode);
  }

  onStartGameClick(): void {
    const gameType = this.gameType.value as GameType;
    this._navService.startGame(gameType);
  }

  onCancelGameClick(): void {
    this._navService.cancel();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get lobbyPeople(): string[] {
    return this._sessionService.players.map((player) => player.name);
  }

  get canStartGame(): boolean {
    return !!this._sessionService.players && this._sessionService.players.length >= gameVariables.minPlayers;
  }
  
  get canCreateOrJoinLobby(): boolean {
    return this.name.valid && (this.roomCode.valid || this.isNew);
  }

  private joinLobby(name: string, roomCode: string): void {
    console.log(`user "${name}" attempting to join room ${roomCode}`);
    
    this._check_canJoinRoom$(name, roomCode).subscribe((canJoinRoom) => {
      if (canJoinRoom) {
        this._baseService.addDoc('player', newPlayer(name), name, roomCode);
        this._sessionService.name = name;
        this._sessionService.roomCode = roomCode;
        this._navService.connectToRoom(roomCode);
      } else {
        console.log('login failed')
      }
    });
  }

  private createLobby(): Observable<string> {
    const MAX_ATTEMPTS = 200;
    let attemptNo = 1;
    let gameType = this.gameType.value as GameType;

    // Run a loop of random roomCode generation and checking if the room already exists
    let roomCode = this._baseService.idGenerator(); // initial roomCode
    return this._check_gameExists$(roomCode,false) // initial check
      .pipe(
        expand((_,index) => {
          attemptNo = index + 2; 
          roomCode = this._baseService.idGenerator(); // nth roomCode (n = 2,...,200)
          return this._check_gameExists$(roomCode,false); // nth check
        }),
        tap((result) => console.log(`Creating room. Attempt: ${attemptNo}, RoomCode: ${roomCode}, Available: ${!result ? 'yes':'no'}`)),
        take(MAX_ATTEMPTS), // stop trying after 200 attempts // [TODO] - What happens if it runs out of attempts
        first((result) => !result), // break the loop once it finds a room thats not taken
        tap(() => this._baseService.addGame(roomCode, newGame(gameType))), // once the loop stops, create the unclaimed room
        map(() => roomCode) // return the roomCode so subscribers know which room to join
      )
  }

  private _load_gameType(): void {
    this._gameService.get$('gameType')
      .pipe(first())
      .subscribe((gameType) => this.gameType.setValue(gameType));
  }

  private _bind_currentPlayers(): void {
    this._navService.currentPlayers
      .pipe(takeUntil(this.destroy$))
      .subscribe((players) => this._sessionService.players = players)
  }
  
  private _bind_countdownTimer(): void {
    const ticker$ = interval(500);
    ticker$
      .pipe(
        withLatestFrom(this._navService.startTime),
        takeUntil(this.destroy$))
      .subscribe(([_,startTime]) => {
        console.log('hit')
        if (!!startTime){ 
          const currentTime = new Date().getTime();
          const secondsRemaining =  Math.ceil((startTime - currentTime)/1000)
          if(secondsRemaining > 0) {
            this.countDownTimer = secondsRemaining;
          } else {
            this.countDownTimer = 0;
            this._navService.goToStage(Stage.RoleReveal);
          }
        } else {
          this.countDownTimer = null;
        }
      })
  }

  private _check_canJoinRoom$(name: string, roomCode: string): Observable<boolean> {
    const gameExists$ = this._check_gameExists$(roomCode)
      .pipe(first());
    const gameIsJoinable$ = zip(
      this._check_nameIsAvailable$(roomCode,name),
      this._check_spaceIsAvailable$(roomCode),
      this._check_gameHasntStarted$(roomCode))
      .pipe(
        first(),
        map((allChecks) => allChecks.every((check) => check)));

    return gameExists$
      .pipe(
        mergeMap((gameExists) => 
          iif(
            // if the game exists...
            () => gameExists,
            // ...return results of the other checks...
            gameIsJoinable$,
            // ...otherwise, return false
            of(false)
          )
        )
      );
  }

  private _check_gameExists$(roomCode: string, log = true): Observable<boolean> {
    const check = this._gameService.check_doesGameExist(roomCode);
    return log
      ? check.pipe(tap(this._reportError(this.ERROR_GAMEDOESNOTEXIST)))
      : check;
  }
  
  private _check_nameIsAvailable$(roomCode: string, name: string): Observable<boolean> {
    return this._baseService.doesDocExist('player', name, roomCode)
      .pipe(
        map((nameIsTaken) => !nameIsTaken),
        tap(this._reportError(this.ERROR_NAMEISNOTAVAILABLE))
      );
  }

  private _check_spaceIsAvailable$(roomCode: string): Observable<boolean> {
    return this._baseService.getCollection<Player>('player',roomCode)
      .pipe(
        map((players) => players.length < gameVariables.maxPlayers),
        tap(this._reportError(this.ERROR_ROOMISFULL))
      );
  }

  private _check_gameHasntStarted$(roomCode: string): Observable<boolean> {
    return this._gameService.get$('stage', roomCode)
    .pipe(
      map((stage: Stage) => stage === Stage.NotBegun),
      tap(this._reportError(this.ERROR_GAMEHASBEGUN))
    );
  }

  private _reportError(message: string): (result: boolean) => void {
    return (result: boolean) => {
      if(!result) {
        this._modalService.error('Join Failed', message)
      }
    }
  }

  private ERROR_GAMEDOESNOTEXIST = 'Game does not exist';
  private ERROR_NAMEISNOTAVAILABLE = 'Name is not avaiable';
  private ERROR_ROOMISFULL = 'This room is full';
  private ERROR_GAMEHASBEGUN = 'This game has already begun';
}

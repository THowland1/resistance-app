import { Injectable } from '@angular/core';
import { Stage, stageUrlPipe } from 'src/enums/stage.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player } from 'src/models/player';
import { BaseService } from './base.service';
import { first } from 'rxjs/operators';
import { Vote } from 'src/enums/vote.enum';
import { Router } from '@angular/router';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  constructor(private base: BaseService,private _gameService: GameService, private router: Router) {
  }

  isConnectedToARoom$ = new BehaviorSubject<boolean>(false);

  connectToRoom(roomCode: string): void {
    this.base.connectToRoom(roomCode);
    this.isConnectedToARoom$.next(true);
    this.currentStage.subscribe((stage)=>{
      this.router.navigate([stageUrlPipe(stage)]);
    })
  }

  get currentStage(): Observable<Stage> {
    return this._gameService.get('stage');
  }

  get currentPlayers(): Observable<Player[]> {
    return this.base.getCollection<Player>('player');
  }

  get startTime(): Observable<number> {
    return this._gameService.get('startTime');
  }

  goToStage(stage: Stage): void {
    this._gameService.update('stage',stage);
    this._gameService.saveChanges();
  }

  startGame(): void {
    const countdownMilliseconds = 4000;
    const currentTime = new Date().getTime();

    this.base.getCollectionCount('player')
      .pipe(first())
      .subscribe((playerCount) => {
        this._gameService.update('startTime', currentTime + countdownMilliseconds);
        this._gameService.update('votes', new Array(playerCount).fill(Vote.notVoted));
        this._gameService.update('team', new Array(playerCount).fill(false));
        this._gameService.saveChanges();
      })
  }

  cancel(): void {
    this._gameService.update('startTime', null);
    this._gameService.saveChanges();
  }
}  

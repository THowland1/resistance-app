import { Injectable } from '@angular/core';
import { Stage } from 'src/enums/stage.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player } from 'src/models/player';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  constructor(private base: BaseService) {}

  isConnectedToARoom$ = new BehaviorSubject<boolean>(false);

  connectToRoom(roomCode: string): void {
    this.base.connectToRoom(roomCode);
    this.isConnectedToARoom$.next(true);
  }

  get currentStage(): Observable<Stage> {
    return this.base.getGameProperty('stage');
  }

  get currentPlayers(): Observable<Player[]> {
    return this.base.getCollection<Player>('player');
  }

  get startTime(): Observable<number> {
    return this.base.getGameProperty('startTime');
  }

  goToStage(stage: Stage): void {
    this.base.updateGameProperty('stage',stage);
  }

  startGame(): void {
    const countdownMilliseconds = 4000;
    const currentTime = new Date().getTime()
    this.base.updateGameProperty('startTime', currentTime + countdownMilliseconds)
  }

  cancel(): void {
    this.base.updateGameProperty('startTime', null)
  }
}  

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Game } from 'src/models/game';
import { SessionService } from './session.service';
import { map, distinctUntilChanged, shareReplay, pluck } from 'rxjs/operators';
import { log } from 'src/functions';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private _base: BaseService, private _sessionService: SessionService) {
    this._sessionService.roomCode$.subscribe((roomCode) => {
       this._players = this._base.getCollection<Player>('player', roomCode).pipe(shareReplay(1),log());
     })
  }

  private _players: Observable<Player[]>;

  get players$(): Observable<Player[]>{
    return this._players.pipe(distinctUntilChanged());
  }

  get count$(): Observable<number> {
    return this._players.pipe(
      map((players) => players.length),
      distinctUntilChanged()
    )
  }

  count(roomCode: string): Observable<number> {
    return this._base.getCollection<Player>('player', roomCode).pipe(map((players) => players.length));
  }

  check_doesPlayerExist(roomCode: string, name: string): Promise<boolean> {
    return this._base.doesDocExist('player', name, roomCode).toPromise();
  }

  update<K extends keyof Player>(key: K, value: Player[K], name: string): void {
    const roomCode = this._sessionService.roomCode;

    this._base.update(roomCode, 'player', name, key, value);
  }

  saveChanges(): Promise<void> {
    return this._base.saveChanges();
  }

}

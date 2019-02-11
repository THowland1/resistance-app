import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { Stage } from 'src/enums/stage.enum';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _base: BaseService, private _sessionService: SessionService) {
    this._sessionService.roomCode$.subscribe((roomCode) => {
      this._game = this._base.getGame(roomCode).pipe(shareReplay(1));
    })
  }

  private _game: Observable<Game>;
  private _gameDelta: Partial<Game> = {};
  private _hasChanged: boolean = false;

  /**
   * Observe a property on the Game object
   * @param key  Key of the Game object to be observed.
   * @param roomCode  Room code of the game, if undefined, the current game will be observed.
   * @returns    Observable of the game's property.
   */
  get<K extends keyof Game>(key: K, roomCode?: string): Observable<Game[K]> {
    const game = !!roomCode
      ? this._base.getGame(roomCode)
      : this._game;

    return game.pipe(
      map((game) => game[key]),
      distinctUntilChanged());
  }

  get game$(): Observable<Game> {
    return this._game;
  }

  update<K extends keyof Game>(key: K, value: Game[K], roomCode?:string): void {
    this._gameDelta[key] = value;
    this._hasChanged = true;
  }

  saveChanges(roomCode?:string): void {
    if (this._hasChanged){
      this._base.game(roomCode).update(this._gameDelta);
      this._gameDelta = {};
      this._hasChanged = false;
  }
  }

}

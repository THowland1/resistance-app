import { Injectable } from '@angular/core';
import { Player, newPlayer } from 'src/models/player';
import { Observable, of, Subject } from 'rxjs';
import { BaseService } from './base.service';
import { bind, log } from 'src/functions';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private _baseService: BaseService) { 
    this.roomCode$.subscribe((roomCode) => {
      this._baseService.getCollection('player', roomCode).subscribe(bind(this,'players'));
    })
  }

  private _name: string;
  private _roomCode: string;
  private _players: Player[];
  
  roomCode$ = new Subject<string>();

  sessionChanged$ = new Subject();

  get name() {
    return this._name;
  }
  set name(newValue) {
    this._name = newValue;
    this.sessionChanged$.next();
  }

  get roomCode() {
    return this._roomCode;
  }
  set roomCode(newValue) {
    this._roomCode = newValue;
    this.roomCode$.next(newValue);
    this.sessionChanged$.next();
  }

  get players() {
    return this._players;
  }
  set players(newValue) {
    this._players = newValue;
    this.sessionChanged$.next();
  }

  get player() {
    if (this._players === undefined){
       return undefined;
    }

    const playerArray = this._players.filter((player) => player.name === this._name);
    return playerArray.length > 0
      ? playerArray[0]
      : newPlayer(`${this._name} (Spectator)`);
  }

  get playerIndex() {
    if (this._players === undefined){
      return undefined;
    }

    return this._players.findIndex((player) => player.name === this._name);
  }

}

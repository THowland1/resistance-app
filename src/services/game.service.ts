import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _base: BaseService) { }

  get missionOutcomes(): Observable<MissionOutcome[]> {
    return this._base.getGameProperty<MissionOutcome[]>('missionOutcomes');
  }

  get playerCount(): Observable<number> {
    return this._base.getCollectionCount('player');
  }

  get noOfDownvotedTeams(): Observable<number> {
    return this._base.getGameProperty('noOfDownvotedTeams')
  }

  get getGame(): Observable<Game> {
    return this._base.getGame();
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Game } from 'src/models/game';
import { SessionService } from './session.service';
import { shareReplay, pluck, map, distinctUntilChanged } from 'rxjs/operators';
import { gameVariables } from 'src/game.variables';
import { MissionOutcome } from 'src/enums/mission-outcome';

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

  check_doesGameExist(roomCode: string): Observable<boolean> {
    return this._base.doesDocExist('','',roomCode);
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

  check_isGameOver(game: Game): boolean {
    var missionOutcomes = game.missionOutcomes;
    var noOfDownvotedTeams = game.noOfDownvotedTeams;

    var noOfMissionsToWin = gameVariables.noOfMissionsToWin;
    var maxNoOfVotesPerMission = gameVariables.maxNoOfVotesPerMission;

    var noOfFails = missionOutcomes.filter((outcome) => outcome === MissionOutcome.fail).length;
    var noOfPasses = missionOutcomes.filter((outcome) => outcome === MissionOutcome.pass).length;
    
    if (noOfFails >= noOfMissionsToWin || noOfPasses >= noOfMissionsToWin || noOfDownvotedTeams >= maxNoOfVotesPerMission){
      return true;
    } else {
      return false;
    }
  }

}

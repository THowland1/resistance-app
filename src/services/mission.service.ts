import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { newMission } from 'src/models/mission';
import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MissionSize } from 'src/models/mission-size';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _base: BaseService) { }

  newMission(leader: number, missionNo: number): void {
    this._base.addDoc('mission', newMission(leader), missionNo.toString());
  }

  currentMissionNo(): Observable<number> {
    return this._base.getCollectionCount('mission').pipe(
      map((count) => count - 1));
  }

  currentLeader(): Observable<string> {
    return this.currentMissionNo()
      .pipe(
        switchMap((missionNo) => this._base.getDocProperty<number>('mission', missionNo.toString(), 'leader')),
        switchMap((leader) => this._base.getDocFromArrayIndex<Player>('player', leader)),
        map((leader) => !!leader ? leader.name : '')
      )

    //this._base.getMissionProperty('leader',)
    //Get current mission number
    // Find the leader of that mission
    // turn the leader number into a player
  }

  getPlayers(): Observable<string[]> {
    return this._base.getCollection<Player>('player')
      .pipe(map((player)=>player.map((player)=>player.name)))
  }

  getTeamSize(): Observable<MissionSize> {
    return zip(
      this._base.getCollectionCount('player'),
      this.currentMissionNo()
      ).pipe(
        map(([playerCount,missionNo]) => this.teamSize(playerCount,missionNo))
      )
  }

  private teamSize(noOfPlayers: number, missionNo: number): MissionSize {
    return this.teamSizes[noOfPlayers-5][missionNo]
  }

  private teamSizes: MissionSize[][] = [
    [{size: 2}, {size: 3}, {size: 2}, {size: 3}, {size: 3}],
    [{size: 2}, {size: 3}, {size: 4}, {size: 3}, {size: 4}],
    [{size: 2}, {size: 3}, {size: 3}, {size: 4, twoFail: true}, {size: 4}],
    [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}],
    [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}],
    [{size: 3}, {size: 4}, {size: 4}, {size: 5, twoFail: true}, {size: 5}]
  ]
}

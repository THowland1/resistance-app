import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { newMission } from 'src/models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _base: BaseService) { }

  newMission(leader: number, missionNo: number): void {
    this._base.addMission(newMission(leader), missionNo);
  }
}

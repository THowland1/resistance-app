import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { newMission } from 'src/models/mission';
import { Observable, zip } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
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

  boolArray2Number(boolArray: boolean[]): number{
    // Starts are array of booleans (e.g. [false,true,false, true])
    const binaryArray = boolArray.map((bool) => (+bool)).reverse(); // Array of 0s and 1s (e.g. [1,0,1,0])
    const charArray = binaryArray.map((bit) => bit.toString()); // Array of '0's and '1's (e.g. ['1','0','1','0'])
    const binaryString = charArray.join(''); // String with '0' and '1' chars (e.g. '1010')
    const decimalNumber = parseInt(binaryString,2); // Decimal value of the binary number (e.g. 10)
    return decimalNumber;
  }

  number2BoolArray(decimalNumber: number): boolean[]{
    // Starts as decimal value of the number (e.g. 10)
    const binaryString = decimalNumber.toString(2);  // String with '0' and '1' chars (e.g. '1010')
    const charArray = binaryString.split(''); // Array of '0's and '1's (e.g. ['1','0','1','0'])
    const binaryArray = charArray.map((char) => parseInt(char)); // Array of 0s and 1s (e.g. [1,0,1,0])
    const boolArray = binaryArray.map((number) => number ? true : false).reverse(); // Array of booleans (e.g. [false,true,false,true])
    return boolArray;
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

  getTeamPick(): Observable<boolean[]>{
    return this.currentMissionNo()
      .pipe(
        switchMap((missionNo) => {
          return this._base.getDocProperty<number>('mission', missionNo.toString(), 'team')
        }),
        map((teamPickAsNumber) => this.number2BoolArray(teamPickAsNumber))
      );
  }

  newTeamPick(teamPick: boolean[]): void {
    const teamPickAsNumber = this.boolArray2Number(teamPick);

    this.currentMissionNo()
      .pipe(first())
      .subscribe((missionNo) => {
        this._base.updateDocProperty('mission',missionNo.toString(),'team',teamPickAsNumber)
      })
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

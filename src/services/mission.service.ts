import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { newMission } from 'src/models/mission';
import { Observable, zip } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { MissionSize } from 'src/models/mission-size';
import { Player } from 'src/models/player';
import { NavService } from './nav.service';
import { Stage } from 'src/enums/stage.enum';
import { IMissionCard, cardsInPlay, missionCards, MissionCard } from 'src/enums/mission-card';
import { GameType } from 'src/enums/game-type';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { Vote } from 'src/enums/vote.enum';
import { gameVariables } from 'src/game.variables';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _base: BaseService,private _nav: NavService) { }

  newMission(leader: number, missionNo: number): void {
    this._base.updateGameProperty('leader',leader);
    this._base.addDoc('mission', newMission(), missionNo.toString());
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

  currentLeader(): Observable<number> {
    // TODO: maybe refactor this to output the leader number next and do the name logic in the component
    return this._base.getGameProperty<number>('leader');
  }

  currentVotes(): Observable<Vote[]> {
    return this._base.getGameProperty<Vote[]>('votes');
  }

  submitVote(vote: boolean, index: number): void {
    //TODO update so it updates part of an array instead of just adding onto the end

    const newVote = vote ? Vote.upvoted : Vote.downvoted;

    this.currentVotes()
      .pipe(
        first(),
        map((votes) => {votes[index] = newVote; return votes;}))
      .subscribe((votes) => this._base.updateGameProperty('votes',votes))
  }

  getPlayers(): Observable<string[]> {
    return this._base.getCollection<Player>('player')
      .pipe(map((player)=>player.map((player)=>player.name)))
  }

  getTeamSize(): Observable<MissionSize> {
    return zip(
      this._base.getCollectionCount('player'),
      this._base.getGameProperty<number>('currentMission')
      ).pipe(
        map(([playerCount,missionNo]) => this.teamSize(playerCount,missionNo))
      )
  }

  getTeamPick(): Observable<boolean[]> {
    return this._base.getGameProperty('team')
  }

  updateTeamPick(teamPick: boolean[]): void {
    this._base.updateGameProperty('team',teamPick);
  }

  updateWait(wait: boolean): void {
    this._base.updateGameProperty('wait',wait);
  }

  moveOn(hasItGoneAhead: boolean): void {
    this.updateWait(false);

    if(hasItGoneAhead === true){
      this._base.getCollectionCount('player')
        .pipe(first())
        .subscribe((count) => {
          this._base.updateGameProperty('playedCards', new Array(count).fill(MissionCard.none));
          this._nav.goToStage(Stage.Mission);
        })
    } else if (hasItGoneAhead === false) {
      // TODO: add to list of failed missions
      // TODO: add to list of failed votes

      zip(
        this._base.getCollectionCount('player'),
        this._base.getGame())
        .pipe(first())
        .subscribe(([playerCount,game]) => {
          const newLeader = (game.leader + 1) % playerCount;

          this._base.updateGameProperty('leader',newLeader);
          this._base.updateGameProperty('votes',new Array(playerCount).fill(null));
          this._nav.goToStage(Stage.TeamPick);
        })
    } else {
      console.error('Something has gone wrong');
    }
    // move to new page

    //const nextLeader = this._base.getGameProperty('')
  }

  nextMission(didItPass: boolean):void {
    var isTheGameOver = false;
    if (isTheGameOver) {
      // End the game
    } else {
      zip(
        this._base.getCollectionCount('player'),
        this._base.getGame())
        .pipe(first())
        .subscribe(([playerCount,game]) => {
          // set new leader
          const newLeader = (game.leader + 1) % playerCount;
          this._base.updateGameProperty('leader', newLeader);

          // add mission outcome to the Game object
          game.missionOutcomes[game.currentMission] = didItPass
            ? MissionOutcome.pass
            : MissionOutcome.fail;
          this._base.updateGameProperty('missionOutcomes', game.missionOutcomes);

          // move the mission count on
          this._base.updateGameProperty('currentMission', game.currentMission + 1)

          // wipe current Mission info (keep the team the same)
          this._base.updateGameProperty('votes',new Array(playerCount).fill(null));
          this._base.updateGameProperty('playedCards',new Array(playerCount).fill(MissionCard.none));
          this._nav.goToStage(Stage.TeamPick);
        })

    }
  }

  updatePlayedCards(missionCards: MissionCard[]) {
    this._base.updateGameProperty('playedCards', missionCards);
  }

  get getPlayedCards(): Observable<MissionCard[]> {
    return this._base.getGameProperty('playedCards');
  }

  get getPlayableCards(): Observable<IMissionCard[]> {
    return this._base.getGameProperty<GameType>('gameType')
      .pipe(map((gameType) => cardsInPlay(gameType).map((card)=>missionCards[card])))
  }

  get wait(): Observable<boolean> {
    return this._base.getGameProperty('wait');
  }

  private teamSize(noOfPlayers: number, missionNo: number): MissionSize {
    return gameVariables.missionSizes[noOfPlayers-5][missionNo]
  }


}

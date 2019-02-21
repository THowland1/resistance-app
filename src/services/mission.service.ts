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
import { Game } from 'src/models/game';
import { GameService } from './game.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private _nav: NavService,
    private _gameService: GameService,
    private _playerService: PlayerService) { }

  currentLeader(): Observable<number> {
    return this._gameService.get('leader');
  }

  currentVotes(): Observable<Vote[]> {
    return this._gameService.get('votes');
  }

  submitVote(vote: boolean, index: number): void {
    //TODO update so it updates part of an array instead of just adding onto the end

    const newVote = vote ? Vote.upvoted : Vote.downvoted;

    this.currentVotes()
      .pipe(
        first(),
        map((votes) => {votes[index] = newVote; return votes;}))
      .subscribe((votes) => {
        this._gameService.update('votes',votes);
        this._gameService.saveChanges();
      });
  }

  getPlayers(): Observable<string[]> {
    return this._playerService.players$
      .pipe(map((player)=>player.map((player)=>player.name)))
  }

  getTeamSize(): Observable<MissionSize> {
    return zip(
      this._playerService.count$,
      this._gameService.get('currentMission')
      ).pipe(
        map(([playerCount,missionNo]) => this.teamSize(playerCount,missionNo))
      )
  }

  getTeamPick(): Observable<boolean[]> {
    return this._gameService.get('team')
  }

  updateTeamPick(teamPick: boolean[]): void {
    this._gameService.update('team',teamPick);
    this._gameService.saveChanges();
  }

  updateWait(wait: boolean): void {
    this._gameService.update('wait',wait);
    this._gameService.saveChanges();
  }

  moveOn(hasItGoneAhead: boolean): void {
    this.updateWait(false);

    if(hasItGoneAhead === true){
      this._playerService.count$
        .pipe(first())
        .subscribe((count) => {
          this._gameService.update('playedCards', new Array(count).fill(MissionCard.none));
          this._gameService.saveChanges();
          this._nav.goToStage(Stage.Mission);
        })
    } else if (hasItGoneAhead === false) {
      // TODO: add to list of failed missions
      // TODO: add to list of failed votes

      zip(
        this._playerService.count$,
        this._gameService.game$)
        .pipe(first())
        .subscribe(([playerCount,game]) => {
          const newLeader = (game.leader + 1) % playerCount;

          game.noOfDownvotedTeams = game.noOfDownvotedTeams + 1;

          this._gameService.update('leader',newLeader);
          this._gameService.update('votes',new Array(playerCount).fill(Vote.notVoted));
          this._gameService.update('noOfDownvotedTeams', game.noOfDownvotedTeams);
          this._gameService.saveChanges();

          if (this.isTheGameOver(game)) {
            this._nav.goToStage(Stage.GameOver);
          } else {
            this._nav.goToStage(Stage.TeamPick);
          }
        })
    } else {
      console.error('Something has gone wrong');
    }
    // move to new page

    //const nextLeader = this._base.getGameProperty('')
  }

  nextMission(didItPass: boolean):void {
    zip(
      this._playerService.count$,
      this._gameService.game$)
      .pipe(first())
      .subscribe(([playerCount,game]) => {
        // set new leader
        const newLeader = (game.leader + 1) % playerCount;
        this._gameService.update('leader', newLeader);

        // add mission outcome to the Game object
        game.missionOutcomes[game.currentMission] = didItPass
          ? MissionOutcome.pass
          : MissionOutcome.fail;
        this._gameService.update('missionOutcomes', game.missionOutcomes);

        // wipe current Mission info (keep the team the same)
        this._gameService.update('votes', new Array(playerCount).fill(Vote.notVoted));
        this._gameService.update('playedCards', new Array(playerCount).fill(MissionCard.none));
        this._gameService.update('noOfDownvotedTeams', 0);

        if (this.isTheGameOver(game)){
          this._nav.goToStage(Stage.GameOver);
        } else {
          this._gameService.update('currentMission', game.currentMission + 1);
          this._gameService.saveChanges();
          this._nav.goToStage(Stage.TeamPick);
        }
      })
  }

  updatePlayedCards(missionCards: MissionCard[]) {
    this._gameService.update('playedCards', missionCards);
    this._gameService.saveChanges();
  }

  get getPlayedCards(): Observable<MissionCard[]> {
    return this._gameService.get('playedCards');
  }

  get getPlayableCards(): Observable<IMissionCard[]> {
    return this._gameService.get('gameType')
      .pipe(map((gameType) => cardsInPlay(gameType).map((card)=>missionCards[card])))
  }
  
  get wait(): Observable<boolean> {
    return this._gameService.get('wait');
  }
  
  private teamSize(noOfPlayers: number, missionNo: number): MissionSize {
    return gameVariables.missionSizes[noOfPlayers-5][missionNo]
  }
  
  private isTheGameOver(game: Game): boolean {
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

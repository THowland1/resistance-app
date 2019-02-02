import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { bind } from 'src/functions';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { MissionSize } from 'src/models/mission-size';
import { gameVariables } from 'src/game.variables';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private _gameService: GameService) { }

  missionOutcomes: MissionOutcome[];
  missionSizes: MissionSize[];
  noOfDownvotedTeams: number;
  currentMission: number;
  private destroy$ = new Subject();

  ngOnInit() {
    this._gameService.missionOutcomes
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'missionOutcomes'));

    this._gameService.noOfDownvotedTeams
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'noOfDownvotedTeams'));

    this._gameService.currentMission
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'currentMission'));

    this._gameService.playerCount
      .pipe(first())
      .subscribe((count) => this.missionSizes = gameVariables.missionSizes[count-5]);
  }

  get voteCountArray(): number[] {
    var maxNoOfVotes = gameVariables.maxNoOfVotesPerMission;
    // Creates an array of [1,2,...,maxNoOfVotes]
    return new Array(maxNoOfVotes).fill(null).map((_,index) => index + 1);
  }
  
  outcomeCss(missionOutcome: MissionOutcome): string {
    switch (missionOutcome) {
      case MissionOutcome.notStarted:
      return 'notstarted';
      case MissionOutcome.pass:
      return 'passed';
      case MissionOutcome.fail:
      return 'failed';
      default:
      return '';
    }
  }

  twoFailCss(missionIndex: number): string {
    const missionSize = this.missionSizes[missionIndex]
    return missionSize.twoFail ? 'twofail' : '';
  }

  currentCss(missionIndex: number): string {
    return this.currentMission === missionIndex ? 'current' : '';
  }
  
  get isLoading(): boolean {
    return [this.missionOutcomes,
      this.missionSizes,
      this.noOfDownvotedTeams,
      this.currentMission].some((prop) => prop === undefined);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
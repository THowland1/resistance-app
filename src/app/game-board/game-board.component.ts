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
  private destroy$ = new Subject();

  ngOnInit() {
    this._gameService.missionOutcomes
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'missionOutcomes'));

    this._gameService.noOfDownvotedTeams
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'noOfDownvotedTeams'));

    this._gameService.playerCount
      .pipe(first())
      .subscribe((count) => this.missionSizes = gameVariables.missionSizes[count-5]);
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

  twoFailCss(missionSize: MissionSize): string {
    return missionSize.twoFail ? 'twofail' : '';
  }
  
  get isLoading(): boolean {
    return [this.missionOutcomes,this.missionSizes].some((prop) => prop === undefined);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

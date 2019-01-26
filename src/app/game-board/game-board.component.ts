import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { bind } from 'src/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private _gameService: GameService) { }

  missionOutcomes: MissionOutcome[];
  private destroy$ = new Subject();

  ngOnInit() {
    this._gameService.missionOutcomes
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'missionOutcomes'));
  }

  get isLoading(): boolean {
    return [this.missionOutcomes].some((prop) => prop === undefined);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/game';
import { bind } from 'src/functions';
import { GameOutcome, GameOutcomeMessagePipe, GameOutcomeWinnerPipe } from 'src/enums/game-outcome.enum';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { gameVariables } from 'src/game.variables';
import { teamPipe } from 'src/enums/team.enum';

@Component({
  selector: 'app-game-over-page',
  templateUrl: './game-over-page.component.html',
  styleUrls: ['./game-over-page.component.scss']
})
export class GameOverPageComponent implements OnInit {

  constructor(private _gameService: GameService) { }

  game: Game;

  ngOnInit() {
    this._gameService.getGame.subscribe(bind(this,'game'));
  }

  @Input() playerName: string;
  @Input() players: Player[];

  get gameOutcome(): GameOutcome {
    if (!this.game){
      return;
    }
    var passingMissions = this.game.missionOutcomes.filter((outcome) => outcome === MissionOutcome.pass).length;
    var failingMissions = this.game.missionOutcomes.filter((outcome) => outcome === MissionOutcome.fail).length;
    var downvotedMissions = this.game.noOfDownvotedTeams;

    if (passingMissions >= gameVariables.noOfMissionsToWin) {
      return GameOutcome.sufficientSuccesses;
    }
    if (failingMissions >= gameVariables.noOfMissionsToWin) {
      return GameOutcome.sufficientFailures;
    }
    if (downvotedMissions >= gameVariables.maxNoOfVotesPerMission) {
      return GameOutcome.tooManyDownvotes;
    }

    console.error('An error has occurred');
    return;
  }

  get gameOutcomeMessage(): string {
    return GameOutcomeMessagePipe(this.gameOutcome);
  }

  get winningTeam(): string {
    var winningTeam = GameOutcomeWinnerPipe(this.gameOutcome);
    return teamPipe(winningTeam);
  }

  get isLoading(): boolean {
    return [this.game].some((prop) => prop === undefined);
  }

}

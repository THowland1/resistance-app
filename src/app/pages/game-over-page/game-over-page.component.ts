import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/game';
import { bind, GameOver } from 'src/functions';
import { GameOutcome, GameOutcomeMessagePipe } from 'src/enums/game-outcome.enum';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { gameVariables } from 'src/game.variables';
import { teamPipe } from 'src/enums/team.enum';
import { SessionService } from 'src/services/session.service';
import { GameType } from 'src/enums/game-type';

@Component({
  selector: 'app-game-over-page',
  templateUrl: './game-over-page.component.html',
  styleUrls: ['./game-over-page.component.scss']
})
export class GameOverPageComponent implements OnInit {

  constructor(private _gameService: GameService,
    private _sessionService: SessionService) { }

  game: Game;
  playerName: string;

  ngOnInit() {
    this.playerName = this._sessionService.name;
    this._gameService.game$.subscribe(bind(this,'game'));
  }

  get gameOutcomeMessage(): string {
    const gameOutcome = GameOver.gameOutcome(this.game, this._sessionService.players);
    return GameOutcomeMessagePipe(gameOutcome);
  }

  get winningTeam(): string {
    var winningTeam = GameOver.winningTeam(this.game, this._sessionService.players);
    return teamPipe(winningTeam);
  }

  get isLoading(): boolean {
    return [this.game, this.playerName].some((prop) => prop === undefined);
  }

}

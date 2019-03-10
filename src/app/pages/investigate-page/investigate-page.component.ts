import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { ModalService } from 'src/app/components/modal/modal.service';
import { GameService } from 'src/services/game.service';
import { zip, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { SessionService } from 'src/services/session.service';
import { Role } from 'src/enums/role.enum';
import { Team } from 'src/enums/team.enum';
import { InvestigationCards } from 'src/app/static-data/investigation-cards';
import { InvestigationCard } from 'src/enums/investigation-card.enum';
import { Stage } from 'src/enums/stage.enum';

@Component({
  selector: 'app-investigate-page',
  templateUrl: './investigate-page.component.html',
  styleUrls: ['./investigate-page.component.scss']
})
export class InvestigatePageComponent implements OnInit {

  constructor(
    private _playerService: PlayerService,
    private _modalService: ModalService,
    private _gameService: GameService,
    private _sessionService: SessionService) { }

  allPlayers = this._playerService.players;
  wait: boolean;
  index_leader: number = this._gameService.get('leader');
  index_investigated: number;
  private destroy$ = new Subject();

  ngOnInit(): void {
    this._bind_wait();
    this._bind_investigated();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get pageMode(): string {
    if (this.wait) {
      return 'post-investigation';
    } else {
      if (this.check_canInvestigate) {
        return 'choose-investigation';
      } else {
        return 'wait-for-investigation';
      }
    }
  }

  get isLoading(): boolean {
    const properties = [this.check_missionPassed, this.wait];
    return properties.some((prop) => prop === undefined);
  }

  click_investigate(playerIndex: number): void {
    if (!this.check_canInvestigatePlayer(playerIndex)) {
      this._modalService.error('Illegal Action', 'You cannot investigate this player');
      return;
    }
    const confirmed = confirm(`Are you sure you wish to investigate ${this.allPlayers[playerIndex].name}?`);
    if (confirmed) {
      this._do_investigate(playerIndex);
    } else {
      return;
    }

  }

  click_moveOn(): void {
    this._gameService.next_mission();
    this._gameService.update('investigated', -1);
    this._gameService.update('wait', false);
    this._gameService.update('stage', Stage.TeamPick);
    this._gameService.saveChanges();
  }

  get string_waitingMessage(): string {
    const investigator = this.allPlayers[this.index_investigator].name;

    return `Waiting for ${investigator} to choose a player to investigate...`
  }

  get string_postInvestigationMessage(): string {
    const investigator = this.allPlayers[this.index_investigator].name;
    const investigated = this.index_investigated === this._sessionService.playerIndex
      ? 'YOU'
      : this.allPlayers[this.index_investigated].name;

    if (this.check_canInvestigate) {
      return `You have chosen to investigate ${investigated}.`;
    } else {
      return `${investigator} has chosen to investigate ${investigated}.`;
    }
  }

  get index_investigator(): number {
    if (this.check_missionPassed) {
      return this.index_leader;
    } else {
      return this._gameService.get('investigator').indexOf(true);
    }
  }

  get check_missionPassed(): boolean {
    const missionOutcomes = this._gameService.get('missionOutcomes');
    const missionNo = this._gameService.get('currentMission');

    return missionOutcomes[missionNo] === MissionOutcome.pass;
  }

  get check_canInvestigate(): boolean {
    return this._sessionService.playerIndex === this.index_investigator;
  }

  check_canInvestigatePlayer(playerIndex: number): boolean {
    if (!this.check_canInvestigate) {
      return false;
    }

    return this._sessionService.playerIndex !== playerIndex;
  }

  private _do_investigate(playerIndex: number): void {
    this._gameService.update('investigated', playerIndex);
    this._gameService.saveChanges();

    const investigatedPlayer = this.allPlayers[playerIndex];
    var investigationCardEnumValue: InvestigationCard;

    if (investigatedPlayer.role === Role.chief) {
      if (investigatedPlayer.team === Team.resistance) {
        investigationCardEnumValue = InvestigationCard.ResistanceChief;
      } else if (investigatedPlayer.team === Team.spy) {
        investigationCardEnumValue = InvestigationCard.SpyChief;
      } else {
        this._modalService.error('Internal Error','Investigated player must have a team');
      }
    } else {
      investigationCardEnumValue = InvestigationCard.NotAChief;
    }

    const message = InvestigationCards.investigationCards[investigationCardEnumValue].message;

    this._modalService.info('Investigation', `${investigatedPlayer.name} is ${message}`);

    this._gameService.update('wait', true);
    this._gameService.saveChanges();
  };

  private _bind_wait(): void {
    this._gameService.get$('wait')
    .pipe(takeUntil(this.destroy$))
    .subscribe((wait) => this.wait = wait);
  }

  private _bind_investigated(): void {
    this._gameService.get$('investigated')
    .pipe(takeUntil(this.destroy$))
    .subscribe((investigatedIndex) => this.index_investigated = investigatedIndex);
  }
}

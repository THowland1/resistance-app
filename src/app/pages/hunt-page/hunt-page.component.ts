import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { ModalService } from 'src/app/components/modal/modal.service';
import { GameService } from 'src/services/game.service';
import { zip, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { SessionService } from 'src/services/session.service';
import { Role } from 'src/enums/role.enum';
import { Team, teamPipe } from 'src/enums/team.enum';
import { InvestigationCards } from 'src/app/static-data/investigation-cards';
import { InvestigationCard } from 'src/enums/investigation-card.enum';
import { Stage } from 'src/enums/stage.enum';
import { MissionCard } from 'src/enums/mission-card';
import { gameVariables } from 'src/game.variables';

@Component({
  selector: 'app-hunt-page',
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss']
})
export class HuntPageComponent implements OnInit {

  constructor(
    private _playerService: PlayerService,
    private _modalService: ModalService,
    private _gameService: GameService,
    private _sessionService: SessionService) { }

  allPlayers = this._playerService.players;
  wait: boolean;
  index_leader: number = this._gameService.get('leader');
  index_hunted: number;
  huntingTeam: Team;
  private destroy$ = new Subject();

  // [TODO-HUNTER] Add prompt for coming out prematurely

  ngOnInit(): void {
    this._load_huntingTeam();
    this._bind_wait();
    this._bind_hunted();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get pageMode(): string {
    if (this.wait) {
      return 'post-hunt';
    } else {
      if (this.check_canHunt) {
        return 'choose-hunt';
      } else {
        return 'wait-for-hunt';
      }
    }
  }

  get isLoading(): boolean {
    const properties = [this.huntingTeam, this.wait];
    return properties.some((prop) => prop === undefined);
  }

  click_hunt(playerIndex: number): void {
    if (!this.check_canHuntPlayer(playerIndex)) {
      this._modalService.error('Illegal Action', 'You cannot investigate this player');
      return;
    }
    const confirmed = confirm(`Are you sure you wish to hunt ${this.allPlayers[playerIndex].name}?`);
    if (confirmed) {
      this._do_hunt(playerIndex);
    } else {
      return;
    }

  }

  click_moveOn(): void {
    const missionOutcomes = this._gameService.get('missionOutcomes');
    const index_currentMission = this._gameService.get('currentMission');

    // If the hunt was successful, the game is over
    if (this.check_huntSuccessful) {
      this._gameService.update('stage', Stage.GameOver);
      this._gameService.saveChanges();
      return;
    }

    // If the mission was caused by three successes/failures, invert the last success/failure
    if (!this._check_didItChiefFail) {
      const missionOutcome = missionOutcomes[index_currentMission];
      var newMissionOutcome: MissionOutcome;
      switch (missionOutcome) {
        case MissionOutcome.pass:
          newMissionOutcome = MissionOutcome.fail;          
          break;
        case MissionOutcome.fail:
          newMissionOutcome = MissionOutcome.pass;          
          break;
        default:
        this._modalService.error('Internal Error', 'Mission did not pass or fail!');
          newMissionOutcome = MissionOutcome.notStarted;        
          break;
      }
      missionOutcomes[index_currentMission] = newMissionOutcome;
      this._gameService.update('missionOutcomes', missionOutcomes);
    }

    // If this is the last mission (inverting will result in 3 wins for the other team), refresh
    if (index_currentMission === gameVariables.noOfMissionsPerGame) {
      // [TODO-HUNTER] - Create new refresh component
      this._gameService.update('stage',Stage.Hunt);
      this._gameService.saveChanges();
      return;
    }

    // If the hunt was unsuccessful and there are other missions to play, go to the investigation
    this._gameService.update('hunted', -1);
    this._gameService.update('wait', false);
    this._gameService.update('stage', Stage.Investigate);
    this._gameService.saveChanges();
  }

  get string_waitingMessage(): string {
    const hunter = this.allPlayers[this.index_hunter].name;
    const team = teamPipe(this.huntingTeam);

    return `${hunter} is the ${team} hunter! Now they hunt...`
  }

  get string_postHuntMessage_choice(): string {
    const hunter = this.allPlayers[this.index_hunter].name;
    const hunted = this.index_hunted === this._sessionService.playerIndex
      ? 'YOU'
      : this.allPlayers[this.index_hunted].name;

    if (this.check_canHunt) {
      return `You have chosen to hunt ${hunted}.`;
    } else {
      return `${hunter} has chosen to hunt ${hunted}.`;
    }
  }

  get string_postHuntMessage_outcome(): string {
    const pronoun = this.check_canHunt ? 'You' : 'They';

    if (this.check_huntSuccessful) {
      return `${pronoun} have found the chief!`;
    } else {
      return `${pronoun} were unsuccessful`;
    }
  }

  get index_hunter(): number {
    const isPlayerTheCorrectHunter = this.allPlayers
      .map((player) => player.team === this.huntingTeam && player.role === Role.hunter);

    return isPlayerTheCorrectHunter.indexOf(true);
  }

  get check_canHunt(): boolean {
    return this._sessionService.playerIndex === this.index_hunter;
  }

  get check_huntSuccessful(): boolean {
    const isPlayerTheOpposingTeamsChief = this.allPlayers
      .map((player) => player.team !== this.huntingTeam && player.role === Role.chief);

    return isPlayerTheOpposingTeamsChief[this.index_hunted];
  }

  check_canHuntPlayer(playerIndex: number): boolean {
    if (!this.check_canHunt) {
      return false;
    }

    return this._sessionService.playerIndex !== playerIndex;
  }

  private _check_didItChiefFail(): boolean {
    const playedCards = this._gameService.get('playedCards');
    return playedCards.includes(MissionCard.chiefFail);
  }

  private _do_hunt(playerIndex: number): void {
    this._gameService.update('hunted', playerIndex);
    this._gameService.update('wait', true);
    this._gameService.saveChanges();
  };

  private _load_huntingTeam(): void {
    const missionOutcomes = this._gameService.get('missionOutcomes');

    const noOfPassingMissions = missionOutcomes.filter((outcome) => outcome === MissionOutcome.pass).length;
    const noOfFailingMissions = missionOutcomes.filter((outcome) => outcome === MissionOutcome.fail).length;
    const didTheMissionChiefFail = this._check_didItChiefFail;

    var huntingTeam: Team;
    if (noOfPassingMissions === gameVariables.noOfMissionsToWin) {
      huntingTeam = Team.resistance;
    } else if (noOfFailingMissions === gameVariables.noOfMissionsToWin || didTheMissionChiefFail) {
      huntingTeam = Team.spy;
    } else {
      this._modalService.error(
        'Internal Error',
        'This page should not have been accessed',
        'No chief fails and insufficient successes/failures')
    }
    this.huntingTeam = huntingTeam;
  }

  private _bind_wait(): void {
    this._gameService.get$('wait')
    .pipe(takeUntil(this.destroy$))
    .subscribe((wait) => this.wait = wait);
  }

  private _bind_hunted(): void {
    this._gameService.get$('hunted')
    .pipe(takeUntil(this.destroy$))
    .subscribe((huntedIndex) => this.index_hunted = huntedIndex);
  }
}

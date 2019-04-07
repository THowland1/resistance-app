import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { ModalService } from 'src/app/components/modal/modal.service';
import { GameService } from 'src/services/game.service';
import { zip, Subject, interval } from 'rxjs';
import { first, takeUntil, map } from 'rxjs/operators';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { SessionService } from 'src/services/session.service';
import { Role } from 'src/enums/role.enum';
import { Team, teamPipe } from 'src/enums/team.enum';
import { InvestigationCards } from 'src/app/static-data/investigation-cards';
import { InvestigationCard } from 'src/enums/investigation-card.enum';
import { Stage } from 'src/enums/stage.enum';
import { MissionCard } from 'src/enums/mission-card';
import { gameVariables } from 'src/game.variables';
import { MissionHelper } from 'src/functions';

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
  spyHunterOut: boolean;
  countdown: number = 10;
  private destroy$ = new Subject();
  private stopCountDown$ = new Subject();

  // [TODO-HUNTER] Add prompt for coming out prematurely

  ngOnInit(): void {
    if (this._gameService.get('spyHunterOut') === false) {
      this._startCountdown();
    }
    this._revealHunter();
    this._load_huntingTeam();
    this._bind_wait();
    this._bind_hunted();
    this._bind_spyHunterOut();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopCountDown$.next();
    this.stopCountDown$.complete();
  }

  get pageMode(): string {
    if (this.spyHunterOut || this.huntingTeam === Team.resistance) {
      if (this.wait) {
        return 'post-hunt';
      } else {
          if (this.check_canHunt) {
            return 'choose-hunt';
          } else {
            return 'wait-for-hunt';
          }
        }
    } else {
      if (this.wait) {
        return 'hunter-didnt-come-out';
      } else {
        if (this.check_canHunt) {
          return 'choose-to-come-out';
        } else {
          return 'wait-for-hunter-to-come-out';
        }
      }
    }
  }

  comeOut(comeOut: boolean): void {
    if (comeOut) {
      this._gameService.update('spyHunterOut', true);
    } else {
      this._gameService.update('wait', true);
    }
    this._gameService.saveChanges();
    this.stopCountDown$.next();
    this.stopCountDown$.complete();
  }
  
  get isLoading(): boolean {
    const properties = [this.huntingTeam, this.wait, this.spyHunterOut];
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
    // If the hunt was successful, the game is over
    if (this.check_huntSuccessful) {
      this._gameService.update('stage', Stage.GameOver);
      this._gameService.saveChanges();
      return;
    }

    // If the hunt was unsuccessful, go to the investigation
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

  private get _check_didItChiefFail(): boolean {
    const playedCards = this._gameService.get('playedCards');
    return playedCards.includes(MissionCard.chiefFail);
  }

  private _do_hunt(playerIndex: number): void {
    this._gameService.update('hunted', playerIndex);
    this._gameService.update('wait', true);
    this._gameService.saveChanges();
  };

  private _load_huntingTeam(): void {
    const game = this._gameService.game;
    const sufficientSuccesses = MissionHelper.passCount(game) >= gameVariables.noOfMissionsToWin;
    const sufficientFailures = MissionHelper.failCount(game) >= gameVariables.noOfMissionsToWin;
    const didTheMissionChiefFail = this._check_didItChiefFail;

    var huntingTeam: Team;
    if (sufficientSuccesses) {
      huntingTeam = Team.resistance;
    } else if (sufficientFailures || didTheMissionChiefFail) {
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

  private _bind_spyHunterOut(): void {
    this._gameService.get$('spyHunterOut')
    .pipe(takeUntil(this.destroy$))
    .subscribe((spyHunterOut) => {
      this.spyHunterOut = spyHunterOut;
      if (spyHunterOut) {
        this.stopCountDown$.next()
        this.stopCountDown$.complete()
      }
    });
  }

  private _revealHunter(): void {
    if (this._sessionService.playerIndex !== 0) { return; } // Only 1 player needs to do this
    const game = this._gameService.game;
    const sufficientSuccesses = MissionHelper.passCount(game) >= gameVariables.noOfMissionsToWin;
    const sufficientFailures = MissionHelper.failCount(game) >= gameVariables.noOfMissionsToWin;
    
    if (sufficientSuccesses) {
      this._gameService.update('resistanceHunterOut', true);
      this._gameService.saveChanges();
    }
    if (sufficientFailures) {
      this._gameService.update('spyHunterOut', true);
      this._gameService.saveChanges();
    }
  }

  private _startCountdown(): void {
    interval(1000)
      .pipe(takeUntil(this.stopCountDown$))
      .subscribe(no => {
        console.log('Im counting');
        this.countdown = 10 - no;
        if (no === 10) {
          this.comeOut(false);
        }
      })
  }
}

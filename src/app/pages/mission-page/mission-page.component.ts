import { Component, OnInit, Input } from '@angular/core';
import { Subject, zip } from 'rxjs';
import { takeUntil, first, map } from 'rxjs/operators';
import { bind} from 'src/functions';
import { Player } from 'src/models/player';
import { IMissionCard, MissionCard, missionCards, cardsInPlay } from 'src/enums/mission-card';
import { MissionSize } from 'src/models/mission-size';
import { Team } from 'src/enums/team.enum';
import { SessionService } from 'src/services/session.service';
import { PlayerTableService } from 'src/app/components/player-table/player-table.service';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/player.service';
import { gameVariables } from 'src/game.variables';
import { MissionOutcome } from 'src/enums/mission-outcome';
import { Stage } from 'src/enums/stage.enum';
import { Vote } from 'src/enums/vote.enum';
import { ModalService } from 'src/app/components/modal/modal.service';
import { MissionSizes } from 'src/app/static-data/mission-sizes';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit {

  constructor(
    private _gameService: GameService,
    private _playerService: PlayerService,
    private _sessionService: SessionService,
    private _tableService: PlayerTableService,
    private _modalService: ModalService) { }

    
  currentTeam: boolean[];
  playableCards: IMissionCard[];
  playedCards: MissionCard[];
  missionSize: MissionSize;

  revealMode: boolean = false;

  private destroy$ = new Subject();
  private forceLoadScreen = false;

  ngOnInit() {
    this._load_missionSize();
    this._load_playableCards();
    this._load_team();
    this._bind_playedCards();
    this._bind_wait();

    this._tableService.setColumnVisibility('hasPlayed',true);
  }

  click_selectCard(missionCard: MissionCard): void{
    // [TODO-HUNTER] - 15 - add more illegal option detection
    const player = this._sessionService.player;
    if(player.team !== Team.spy && missionCard === MissionCard.fail){
      this._modalService.error('Illegal Action','you cannot play that card');
      return;
    }
    this.playedCards[this._sessionService.playerIndex] = missionCard;
    this._gameService.update('playedCards', this.playedCards);
    this._gameService.saveChanges();
  }

  click_revealCards(): void{
    this._gameService.update('wait',true);
    this._gameService.saveChanges();
  }

  click_nextMission():void {
    this.forceLoadScreen = true;
    this._gameService.update('wait', false);

    // [TODO-HUNTER] - 12 - make the potential next stage a new investigation stage
    this._gameService.game$
      .pipe(first())
      .subscribe((game) => {
        // set new leader
        const playerCount = this._playerService.count
        const newLeader = (game.leader + 1) % playerCount;
        this._gameService.update('leader', newLeader);

        // add mission outcome to the Game object
        game.missionOutcomes[game.currentMission] = this.check_missionPassed
          ? MissionOutcome.pass
          : MissionOutcome.fail;
        this._gameService.update('missionOutcomes', game.missionOutcomes);

        // wipe current Mission info (keep the team the same)
        this._gameService.update('votes', new Array(playerCount).fill(Vote.notVoted));
        this._gameService.update('playedCards', new Array(playerCount).fill(MissionCard.none));
        this._gameService.update('noOfDownvotedTeams', 0);

        // move to the next stage
        if (this._gameService.check_isGameOver(game)){
          this._gameService.update('stage',Stage.GameOver);
        } else {
          this._gameService.update('currentMission', game.currentMission + 1);
          this._gameService.update('stage',Stage.TeamPick);
        }
        this._gameService.saveChanges();
      })
  }

  get pageMode(): string {
    if (this.revealMode) {
      return 'reveal';
    }
    if (this._check_allCardsPlayed){
      return 'can-reveal';
    }
    if (this._check_youAreOnTheTeam && !this._check_alreadyPlayedCard) {
      return 'play-card';
    }
    return 'wait';
  }

  get revealedCards(): string {
    return this.playedCards
      .filter((card) => card !== MissionCard.none)
      .sort()
      .map((card) => missionCards[card].name)
      .join(', ');
  }

  get isLoading(): boolean {
    return [
      this.currentTeam,
      this.playableCards,
      this.playedCards,
      this.missionSize
    ].some((prop)=>prop === undefined) || this.forceLoadScreen;
  }

  ngOnDestroy(): void {
    this._tableService.setColumnVisibility('hasPlayed',false);
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  get check_missionPassed(): boolean {
    const requiredFails = this.missionSize.twoFail ? 2 : 1;

    // [TODO-HUNTER] - 13 - check for a new kind of fail
    return this.playedCards.filter((card) => card === MissionCard.fail).length < requiredFails;
  }
  
  private get _check_allCardsPlayed(): boolean {
    return this.playedCards.filter((card) => card !== MissionCard.none).length === this.missionSize.size;
  }

  private get _check_alreadyPlayedCard(): boolean {
    return this.playedCards[this._sessionService.playerIndex] != MissionCard.none;
  }

  private get _check_youAreOnTheTeam(): boolean {
    return this.currentTeam[this._sessionService.playerIndex] === true;
  }

  private _load_missionSize(): void {
    this._gameService.get$('currentMission')
      .pipe(first())
      .subscribe((missionNo) => this.missionSize = MissionSizes.allMissionSizes(this._playerService.count)[missionNo])
  }

  private _load_playableCards(): void {
    this._gameService.get$('gameType')
      .pipe(first())
      .subscribe((gameType) => this.playableCards = cardsInPlay(gameType))
  }

  private _load_team(): void {
    this._gameService.get$('team')
      .pipe(first())
      .subscribe(bind(this,'currentTeam'));
  }

  private _bind_playedCards(): void {
    this._gameService.get$('playedCards')
      .pipe(takeUntil(this.destroy$))
      .subscribe((cards) => this.playedCards = cards);
  }

  private _bind_wait(): void {
    this._gameService.get$('wait')
      .pipe(takeUntil(this.destroy$))
      .subscribe((wait) => {
        if (wait) {
          this.revealMode = true;
        }
      });
  }

}

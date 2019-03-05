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
    private _tableService: PlayerTableService) { }

    
  currentTeam: boolean[];
  playableCards: IMissionCard[];
  playedCards: MissionCard[];
  playerName: string;
  missionSize: MissionSize;
  players: Player[];

  revealMode: boolean = false;

  private destroy$ = new Subject();
  private forceLoadScreen = false;

  ngOnInit() {
    this.playerName = this._sessionService.name;
    this.players = this._sessionService.players;

    this._gameService.get('team')
      .pipe(
        first())
      .subscribe(bind(this,'currentTeam'));

    this._gameService.get('gameType')
      .pipe(
        first(),
        map((gameType) => cardsInPlay(gameType).map((card)=>missionCards[card])))
      .subscribe(bind(this,'playableCards'));

    this._gameService.get('playedCards')
        .pipe(takeUntil(this.destroy$))
        .subscribe(bind(this,'playedCards'));

    zip(
      this._playerService.count$,
      this._gameService.get('currentMission'))
    .pipe(
      first(),
      map(([playerCount,missionNo]) => gameVariables.missionSizes[playerCount-5][missionNo]))
    .subscribe(bind(this,'missionSize'))

    this._tableService.setColumnVisibility('hasPlayed',true);
  }

  selectCard(missionCard: MissionCard): void{
    // TODO refactor card filtering logic
    if(!this.areYouASpy && missionCard === MissionCard.fail){
      alert('you cannot play that card');
      return;
    }
    this.playedCards[this.playerIndex] = missionCard;
    this.updatePlayedCards(this.playedCards);
  }

  updatePlayedCards(missionCards: MissionCard[]) {
    this._gameService.update('playedCards', missionCards);
    this._gameService.saveChanges();
  }

  revealCards(): void{
    this.revealMode = true;
  }

  nextMission():void {
    this.forceLoadScreen = true;
    zip(
      this._playerService.count$,
      this._gameService.game$)
      .pipe(first())
      .subscribe(([playerCount,game]) => {
        // set new leader
        const newLeader = (game.leader + 1) % playerCount;
        this._gameService.update('leader', newLeader);

        // add mission outcome to the Game object
        game.missionOutcomes[game.currentMission] = this.missionPassed
          ? MissionOutcome.pass
          : MissionOutcome.fail;
        this._gameService.update('missionOutcomes', game.missionOutcomes);

        // wipe current Mission info (keep the team the same)
        this._gameService.update('votes', new Array(playerCount).fill(Vote.notVoted));
        this._gameService.update('playedCards', new Array(playerCount).fill(MissionCard.none));
        this._gameService.update('noOfDownvotedTeams', 0);

        if (this._gameService.check_isGameOver(game)){
          this._gameService.update('stage',Stage.GameOver);
        } else {
          this._gameService.update('currentMission', game.currentMission + 1);
          this._gameService.update('stage',Stage.TeamPick);
        }
        this._gameService.saveChanges();
      })
  }

  get revealedCardsAsString(): string {
    return this.cardstoReveal.map((card) => missionCards[card].name).join(', ');
  }

  get cardstoReveal(): MissionCard[] {
    return this.playedCards.filter((card) => card !== MissionCard.none).sort();
  }

  get missionPassed(): boolean {
    const requiredFails = this.missionSize.twoFail ? 2 : 1;

    return this.cardstoReveal.filter((card) => card === MissionCard.fail).length < requiredFails;
  }

  get allCardsPlayed(): boolean {
    return this.playedCards.filter((card) => card !== MissionCard.none).length === this.missionSize.size;
  }

  get playerIndex(): number {
    return this.players.map((player) => player.name).indexOf(this.playerName);
  }

  get alreadyPlayedCard(): boolean {
    return this.playedCards[this.playerIndex] != MissionCard.none;
  }

  get areYouASpy(): boolean{
    var you = this.players.filter((player) => player.name === this.playerName);
    if (you.length === 0){ return false;}
    if (you[0].team === Team.spy) {return true;}
    return false;
  }

  get isLoading(): boolean {
    return [
      this.currentTeam,
      this.playableCards,
      this.playedCards,
      this.missionSize,
      this.playerName,
      this.players
    ].some((prop)=>prop === undefined) || this.forceLoadScreen;
  }

  get youAreOnTheTeam(): boolean {
    return this.currentTeam[this.playerIndex] === true;
  }

  ngOnDestroy(): void {
    this._tableService.setColumnVisibility('hasPlayed',false);
    this.destroy$.next();
    this.destroy$.complete();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil, first, map } from 'rxjs/operators';
import { bind} from 'src/functions';
import { Player } from 'src/models/player';
import { IMissionCard, MissionCard, missionCards } from 'src/enums/mission-card';
import { MissionSize } from 'src/models/mission-size';
import { Team } from 'src/enums/team.enum';
import { SessionService } from 'src/services/session.service';
import { PlayerTableService } from 'src/app/components/player-table/player-table.service';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit {

  constructor(
    private _missionService: MissionService,
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

    this._missionService.getTeamPick()
      .pipe(
        first())
      .subscribe(bind(this,'currentTeam'));

    this._missionService.getPlayableCards
        .pipe(first())
        .subscribe(bind(this,'playableCards'));

    this._missionService.getPlayedCards
        .pipe(takeUntil(this.destroy$))
        .subscribe(bind(this,'playedCards'));

    this._missionService.getTeamSize()
        .pipe(first())
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
    this._missionService.updatePlayedCards(this.playedCards);
  }

  revealCards(): void{
    this.revealMode = true;
  }

  nextMission(): void {
    this.forceLoadScreen = true;
    this._missionService.nextMission(this.missionPassed);
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

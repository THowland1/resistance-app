import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil, first, map } from 'rxjs/operators';
import { bind, log } from 'src/functions';
import { Player } from 'src/models/player';
import { IMissionCard, MissionCard, missionCards } from 'src/enums/mission-card';
import { MissionSize } from 'src/models/mission-size';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit {

  constructor(private _missionService: MissionService) { }

  @Input() playerName: string;
  @Input() players: Player[];

  currentTeam: Player[];
  playableCards: IMissionCard[];
  playedCards: MissionCard[];
  missionSize: MissionSize;

  revealMode: boolean = false;

  private destroy$ = new Subject();
  private forceLoadScreen = false;

  ngOnInit() {
    this._missionService.getTeamPick()
      .pipe(
        first(),
        map((bools) => this.players.filter((_,index) => bools[index])))
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
  }

  selectCard(missionCard: MissionCard): void{
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

  get isLoading(): boolean {
    return [
      this.currentTeam,
      this.playableCards,
      this.playedCards,
      this.missionSize
    ].some((prop)=>prop === undefined) || this.forceLoadScreen;
  }

  get youAreOnTheTeam(): boolean {
    return this.currentTeam.some((player) => player.name === this.playerName)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

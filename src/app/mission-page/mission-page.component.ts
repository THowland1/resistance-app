import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil, first, map } from 'rxjs/operators';
import { bind, log } from 'src/functions';
import { Player } from 'src/models/player';
import { IMissionCard, MissionCard } from 'src/enums/mission-card';

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

  private destroy$ = new Subject();

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
  }

  selectCard(missionCard: MissionCard): void{
    this.playedCards[this.playerIndex] = missionCard;
    this._missionService.updatePlayedCards(this.playedCards);
  }

  get playerIndex(): number {
    return this.players.map((player) => player.name).indexOf(this.playerName);
  }

  get isLoading(): boolean {
    return [this.currentTeam, this.playableCards].some((prop)=>prop === undefined);
  }

  get youAreOnTheTeam(): boolean {
    return this.currentTeam.some((player) => player.name === this.playerName)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

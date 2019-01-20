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

  private destroy$ = new Subject();

  ngOnInit() {
    this._missionService.getTeamPick()
      .pipe(
        first(),
        map((bools) => this.players.filter((_,index) => bools[index])))
      .subscribe(bind(this,'currentTeam'));

    this._missionService.getPlayableCards
        .pipe(first())
        .pipe(log())
        .subscribe(bind(this,'playableCards'))
  }

  selectCard(missionCard: MissionCard): void{
    console.log(this.playableCards.filter((card) => card.enumValue === missionCard)[0]);
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

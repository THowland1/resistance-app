import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Stage } from 'src/enums/stage.enum';
import { bind } from 'src/functions';
import { Player } from 'src/models/player';



@Component({
  selector: 'app-team-pick-page',
  templateUrl: './team-pick-page.component.html',
  styleUrls: ['./team-pick-page.component.scss']
})

export class TeamPickPageComponent implements OnInit {

  constructor(private _missionService: MissionService,
    private _navService: NavService) { }
  
  @Input() players: Player[];

  currentLeader: string;
  selectedPlayers: boolean[];
  teamSize: number;
  
  private destroy$ = new Subject();
  
  @Input() playerName: string;

  ngOnInit() { 
    this._missionService.currentLeader()
      .pipe(takeUntil(this.destroy$),map((leader) => this.players[leader].name))
      .subscribe(bind(this,'currentLeader'));

    this._missionService.getTeamSize()
      .pipe(takeUntil(this.destroy$),map((teamSize) => teamSize.size))
      .subscribe(bind(this,'teamSize'));

    this._missionService.getTeamPick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'selectedPlayers'));
  }

  teamChange() {
    this._missionService.updateTeamPick(this.selectedPlayers);
  }

  submitTeam(): void {
    if (!this.canSubmitTeam){
      return;
    }
    this._navService.goToStage(Stage.Vote);
  }

  get isLoading(): boolean {
    return [
      this.currentLeader,
      this.selectedPlayers,
      this.teamSize
    ].some((prop) => prop === undefined);
  }

  get canSubmitTeam(): boolean {
    return this.numberOfSelectedPlayers === this.teamSize && this.youAreTheLeader;
  }

  get numberOfSelectedPlayers(): number{
    return this.selectedPlayers.filter((selected) => selected).length;
  }

  get youAreTheLeader(): boolean {
    return this.playerName === this.currentLeader;
  }

  get whoseTurn(): string {
    if (this.youAreTheLeader){
      return 'YOUR'
    } else {
      return `${this.currentLeader}'s`;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

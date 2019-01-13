import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-team-pick-page',
  templateUrl: './team-pick-page.component.html',
  styleUrls: ['./team-pick-page.component.scss']
})

export class TeamPickPageComponent implements OnInit {

  constructor(private _missionService: MissionService) { }
  currentLeader: string;
  currentPlayers: string[];
  selectedPlayers: boolean[];
  teamSize: number;
  
  private destroy$ = new Subject();
  private teamChange$ = new Subject<number>();

  
  @Input() playerName: string;

  ngOnInit() {
    
    this._missionService.currentLeader()
      .pipe(takeUntil(this.destroy$))
      .subscribe((leader) => {
        this.currentLeader = leader;
      })

      this._missionService.getPlayers()
        .pipe(takeUntil(this.destroy$))
        .subscribe((players)=> {
          this.currentPlayers = players;
          this.selectedPlayers = Array(players.length).fill(false);
        });

      this._missionService.getTeamSize()
        .pipe(takeUntil(this.destroy$))
        .subscribe((teamSize) => this.teamSize = teamSize.size);

      this.teamChange$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => this._missionService.newTeamPick(value));
  }

  teamChange() {
    const teamPick = this._missionService.boolArray2Number(this.selectedPlayers);
    this.teamChange$.next(teamPick);
  }

  submitTeam(): void {
    if (!this.canSubmitTeam){
      return;
    }
    alert('Submitting team');
  }

  get isLoading(): boolean {
    return [
      this.currentLeader,
      this.currentPlayers,
      this.selectedPlayers,
      this.teamSize
    ].some((prop) => prop === undefined);
  }

  get canSubmitTeam(): boolean {
    return this.numberOfSelectedPlayers === this.teamSize;
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
    this.teamChange$.complete();
  }

}

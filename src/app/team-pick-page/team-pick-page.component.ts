import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';



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
  private teamChange$ = new Subject<boolean[]>();

  
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

      this._missionService.getTeamPick()
        .pipe(takeUntil(this.destroy$))
        .subscribe((teamPick) => {
          const selectedPlayers = Array(this.selectedPlayers.length).fill(false);
          selectedPlayers.splice(0,teamPick.length,...teamPick);
          
          this.selectedPlayers = selectedPlayers;
        }
          );
  }

  teamChange() {
    this.teamChange$.next(this.selectedPlayers);
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
    this.teamChange$.complete();
  }

}

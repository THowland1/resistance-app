import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Stage } from 'src/enums/stage.enum';
import { bind } from 'src/functions';
import { Player } from 'src/models/player';
import { SessionService } from 'src/services/session.service';
import { GameService } from 'src/services/game.service';
import { IColumn } from 'src/app/components/player-table/player-table.component';



@Component({
  selector: 'app-team-pick-page',
  templateUrl: './team-pick-page.component.html',
  styleUrls: ['./team-pick-page.component.scss']
})

export class TeamPickPageComponent implements OnInit {

  constructor(private _missionService: MissionService,
    private _gameService: GameService,
    private _navService: NavService,
    private _sessionService: SessionService) { }
  
    
  currentLeader: string;
  teamSize: number;
  playerName: string;
  players: Player[];
  columns: IColumn = {};

  private destroy$ = new Subject();

  ngOnInit() { 
    this.playerName = this._sessionService.name;
    this.players = this._sessionService.players;

    this._gameService.get('leader')
      .pipe(takeUntil(this.destroy$),map((leader) => this.players[leader].name))
      .subscribe(bind(this,'currentLeader'));

    this._missionService.getTeamSize()
      .pipe(takeUntil(this.destroy$),map((teamSize) => teamSize.size))
      .subscribe(bind(this,'teamSize'));

    this._missionService.getTeamPick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedPlayers) => this.columns['Team'] = selectedPlayers);
  }

  onTeamChange(position:string): void {
    const pos = position.toLowerCase() as any; // [TODO] - Make it so it knows
      this._gameService.update(pos,this.columns[position]);
      this._gameService.saveChanges();
  }

  onSubmitTeamClick(): void {
    if (!this.canSubmitTeam){
      return;
    }
    this._navService.goToStage(Stage.Vote);
  }

  get numberOfSelectedPlayers(): number{
    return this.columns['Team'].filter((selected) => selected).length;
  }

  get whoseTurn(): string {
    if (this.canEditTeam){
      return 'YOUR'
    } else {
      return `${this.currentLeader}'s`;
    }
  }

  get canEditTeam(): boolean {
    return this.playerName === this.currentLeader;;
  }
  
  get canSubmitTeam(): boolean {
    return this.numberOfSelectedPlayers === this.teamSize && this.canEditTeam;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  get isLoading(): boolean {
    return [
      this.currentLeader,
      this.teamSize,
      this.playerName,
      this.players
    ].some((prop) => prop === undefined);
  }

}

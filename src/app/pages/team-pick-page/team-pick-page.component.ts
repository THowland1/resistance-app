import { Component, OnInit } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { NavService } from 'src/services/nav.service';
import { Stage } from 'src/enums/stage.enum';
import { Player } from 'src/models/player';
import { SessionService } from 'src/services/session.service';
import { GameService } from 'src/services/game.service';
import { gameVariables } from 'src/game.variables';
import { PlayerTableService } from 'src/app/components/player-table/player-table.service';
import { MissionSizes } from 'src/app/static-data/mission-sizes';
import { GameType } from 'src/enums/game-type';

@Component({
  selector: 'app-team-pick-page',
  templateUrl: './team-pick-page.component.html',
  styleUrls: ['./team-pick-page.component.scss']
})

export class TeamPickPageComponent implements OnInit {

  constructor(private _gameService: GameService,
    private _navService: NavService,
    private _sessionService: SessionService,
    private _tableService: PlayerTableService) { }
  
  playerName: string;
  players: Player[];
  currentLeader: string;
  teamSize: number;
  gameType: GameType = this._gameService.get('gameType');
  team: boolean[];
  investigator: boolean[];

  private destroy$ = new Subject();

  ngOnInit() { 
    this.playerName = this._sessionService.name;
    this.players = this._sessionService.players;

    this._bind_currentLeader();
    this._bind_currentMission();
    this._bind_team();

    if(this.check_isHunterModule) {
      this._bind_investigator();
    }

    this._tableService.initialiseTable();
    this._tableService.setVisibility(true);
    this._tableService.setColumnVisibility('vote',false);
    this._tableService.setColumnVisibility('team',true);

    if (this.check_isHunterModule) {
      this._tableService.setColumnVisibility('investigator',true);
    }

    this.canEditTeam$
      .pipe(takeUntil(this.destroy$))
      .subscribe((canEditTeam) => {
        this._tableService.setColumnReadonly('team', !canEditTeam);
        if (this.check_isHunterModule) {
          this._tableService.setColumnReadonly('investigator', !canEditTeam);
        }
    });
  }

  onSubmitTeamClick(): void {
    if (!this.canSubmitTeam){
      return;
    }

    this._tableService.setColumnReadonly('team',true);

    if (this.check_isHunterModule) {
      this._tableService.setColumnReadonly('investigator', true);
    }

    this._navService.goToStage(Stage.Vote);
  }

  get selectedPlayersCount(): number{
    return this.team.filter((selected) => selected).length;
  }

  get selectedInvestigatorsCount(): number {
    if (this.check_isHunterModule) {
      return this.investigator.filter((selected) => selected).length;
    } else {
      return null;
    }
  }

  get whoseTurn(): string {
    if (this.canEditTeam){
      return 'YOUR'
    } else {
      return `${this.currentLeader}'s`;
    }
  }

  get canEditTeam(): boolean {
    return this.playerName === this.currentLeader;
  }

  get canEditTeam$(): Observable<boolean> {
    return of(this.canEditTeam);
  }
  
  get canSubmitTeam(): boolean {
    if (!this.canEditTeam) {
      return false;
    }

    if (this.selectedPlayersCount !== this.teamSize) {
      return false;
    }

    if (this.check_isHunterModule) {
      const countInvestigators = this.selectedInvestigatorsCount;
      const allowedInvestigators = 1;

      // There may only be one investigator
      if (countInvestigators !== allowedInvestigators) {
        return false;
      }

      // Investigator cannot be on the mission
      for (let index = 0; index < this.players.length; index++) {
        if (this.team[index] && this.investigator[index]) {
          return false;
        }
      }

      // Investigator cannot be the leader
      if (this.investigator.indexOf(true) === this._sessionService.playerIndex) {
        return false;
      }
    }

    return true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  get isLoading(): boolean {
    const propertiesToLoad: any[] = [
      this.currentLeader,
      this.teamSize,
      this.playerName,
      this.players,
      this.team
    ];
    if (this.check_isHunterModule) {
      propertiesToLoad.push(this.investigator);
    }

    return propertiesToLoad.some((prop) => prop === undefined);
  }

  get check_isHunterModule(): boolean {
    return this.gameType === GameType.hunter;
  }

  private _bind_currentLeader(): void {
    this._gameService.get$('leader')
      .pipe(takeUntil(this.destroy$),map((leader) => this.players[leader].name))
      .subscribe((leader) => this.currentLeader = leader);
  }

  private _bind_currentMission(): void {
    this._gameService.get$('currentMission')
      .pipe(takeUntil(this.destroy$))
      .subscribe((missionNo) => this.teamSize = MissionSizes.allMissionSizes(this.players.length)[missionNo].size)
  }

  private _bind_team(): void {
    this._gameService.get$('team')
    .pipe(takeUntil(this.destroy$))
    .subscribe((selectedPlayers) => this.team = selectedPlayers);
  }

  private _bind_investigator(): void {
    this._gameService.get$('investigator')
    .pipe(takeUntil(this.destroy$))
    .subscribe((investigator) => this.investigator = investigator);
  }
}

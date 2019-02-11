import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from 'src/services/role.service';
import { Subject } from 'rxjs';
import { Player } from 'src/models/player';
import { takeUntil } from 'rxjs/operators';
import { Role, rolePipe } from 'src/enums/role.enum';
import { Team, teamPipe } from 'src/enums/team.enum';
import { NavService } from 'src/services/nav.service';
import { Stage } from 'src/enums/stage.enum';
import { MissionService } from 'src/services/mission.service';
import { SessionService } from 'src/services/session.service';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-role-reveal-page',
  templateUrl: './role-reveal-page.component.html',
  styleUrls: ['./role-reveal-page.component.scss']
})
export class RoleRevealPageComponent implements OnInit {

  constructor(
    private _roleService: RoleService,
    private _navService: NavService,
    private _missionService: MissionService,
    private _sessionService: SessionService,
    private _playerService: PlayerService) { }

    @Output() playersAssigned = new EventEmitter<Player[]>();
    
    teamEnum = Team;
    
  playerName: string;
  canAssignRoles = false;
  rolesAssigned = false;
  player: Player;
  destroy$ = new Subject();
  private currentPlayers: Player[];
  teamPipe = teamPipe;
  rolePipe = rolePipe;

  ngOnInit() {
    this.playerName = this._sessionService.name;

    this._playerService.players$
      .pipe(takeUntil(this.destroy$))
      .subscribe((players) => {
        if (players.every((player) => this.playerIsAssigned(player))){
          this.currentPlayers = players;
          this.rolesAssigned = true;
          this.canAssignRoles = false;
          this.player = players.filter((player) => player.name === this.playerName)[0];
          this.playersAssigned.emit(players);
        } else {
          this.currentPlayers = [];
          this.rolesAssigned = false;
          this.canAssignRoles = true;
        }
      })
  }

  assignRoles(): void {
    if (!this.canAssignRoles){return;}
    this._roleService.assignRoles();
  }

  startGame(): void {
    if (!this.playerIsAssigned(this.player)) {return;}
    this._missionService.newMission(0,0);
    this._navService.goToStage(Stage.TeamPick);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get fellowSpies(): Player[] {
    if (this.player.team !== Team.spy){
      return [];
    }
    return this.currentPlayers
      .filter((player) => player.team === Team.spy && player.name !== this.player.name);
  }
  
  private playerIsAssigned(player: Player): boolean {
    return player.role != Role.unassigned && player.team != Team.unassigned;
  }

}

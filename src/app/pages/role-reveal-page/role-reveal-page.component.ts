import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from 'src/models/player';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/enums/role.enum';
import { Team } from 'src/enums/team.enum';
import { NavService } from 'src/services/nav.service';
import { Stage } from 'src/enums/stage.enum';
import { SessionService } from 'src/services/session.service';
import { PlayerService } from 'src/services/player.service';
import { RoleDistribution } from 'src/app/static-data/player-setup';
import { ModalService } from 'src/app/components/modal/modal.service';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-role-reveal-page',
  templateUrl: './role-reveal-page.component.html',
  styleUrls: ['./role-reveal-page.component.scss']
})
export class RoleRevealPageComponent implements OnInit {

  constructor(
    private _navService: NavService,
    private _gameService: GameService,
    private _sessionService: SessionService,
    private _playerService: PlayerService,
    private _modalService: ModalService) { }

  teamEnum = Team;
    
  playerName: string = this._sessionService.name;
  canAssignRoles = false;
  canStartGame = false;
  player: Player;
  destroy$ = new Subject();

  ngOnInit() {
    this._playerService.players$
      .pipe(takeUntil(this.destroy$))
      .subscribe((players) => {
        if (players.every((player) => this.playerIsAssigned(player))){
          this.player = this._sessionService.player;
          this.canStartGame = true;
          this.canAssignRoles = false;
        } else {
          this.canStartGame = false;
          this.canAssignRoles = true;
        }
      })
  }

  onAssignRolesClick(): void {
    if(!this.canAssignRoles){
      this._modalService.error('Internal Error', 'You cannot assign roles at this time');
      return;
    }
    
    const players = this._playerService.players;
    const allRoleCards = RoleDistribution
      .allRoles('Regular', players.length)
      .shuffle();

    players.forEach((player,index) => {
      const roleCard = allRoleCards[index];
      this._playerService.update('team', roleCard.team, player.name);
      this._playerService.update('role', roleCard.role, player.name);
    });
    
    this._playerService.saveChanges();
  }
  
  onStartGameClick(): void {
    if (!this.canStartGame) {
      this._modalService.error('Internal Error', 'You cannot start the game at this time');
      return;
    }

    this._gameService.update('leader',0);
    this._gameService.saveChanges();
    this._navService.goToStage(Stage.TeamPick);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private playerIsAssigned(player: Player): boolean {
    return player.role != Role.unassigned
      && player.team != Team.unassigned;
  }

}

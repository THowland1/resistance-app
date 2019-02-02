import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { teamPipe, Team } from 'src/enums/team.enum';
import { rolePipe } from 'src/enums/role.enum';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BaseService } from 'src/services/base.service';
import { bind } from 'src/functions';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-session-info-bar',
  templateUrl: './session-info-bar.component.html',
  styleUrls: ['./session-info-bar.component.scss']
})
export class SessionInfoBarComponent implements OnInit {

  constructor(private _base: BaseService,
    private _sessionService: SessionService) { }

    
  faUser = faUser;
  name: string;
  roomCode: string;
  player: Player;
  players: Player[];


  ngOnInit() {
    this.updateSessionVariables();
    this._sessionService.sessionChanged$.subscribe((_) => this.updateSessionVariables());
  }
  
  clickUser(): void {
    if(this.players === undefined){return ;}
    if(this.player.team === Team.spy){ // TODO improve the click info
      alert(`You are a ${teamPipe(this.player.team)}: ${rolePipe(this.player.role)}, and your fellow spies are ${this.fellowSpies}`)
    } else {
      alert(`You are a ${teamPipe(this.player.team)}: ${rolePipe(this.player.role)}`)
    }
  }
  
  get fellowSpies(): string {
    if(this.player.team !== Team.spy){ return 'none of your business'; }
    return this.players
      .filter((player) => player.team === Team.spy && player.name !== this.player.name)
      .map((player) => player.name)
      .join(', ');
  }

  private updateSessionVariables(): void {
    this.name = this._sessionService.name;
    this.roomCode = this._sessionService.roomCode;
    this.players = this._sessionService.players;
    this.player = this._sessionService.player;
  }

}

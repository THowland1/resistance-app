import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/enums/team.enum';
import { Player } from 'src/models/player';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BaseService } from 'src/services/base.service';
import { SessionService } from 'src/services/session.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-session-info-bar',
  templateUrl: './session-info-bar.component.html',
  styleUrls: ['./session-info-bar.component.scss']
})
export class SessionInfoBarComponent implements OnInit {

  constructor(private _base: BaseService,
    private _sessionService: SessionService,
    private _modalService: ModalService) { }

    
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
    this._modalService.roleCard(this.player.team,this.player.role,this.fellowSpies )
  }
  
  get fellowSpies(): Player[] {
    if(this.player.team !== Team.spy){ return undefined; }
    return this.players
      .filter((player) => player.team === Team.spy && player.name !== this.player.name);
  }

  private updateSessionVariables(): void {
    this.name = this._sessionService.name;
    this.roomCode = this._sessionService.roomCode;
    this.players = this._sessionService.players;
    this.player = this._sessionService.player;
  }

}

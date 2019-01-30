import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { teamPipe, Team } from 'src/enums/team.enum';
import { rolePipe } from 'src/enums/role.enum';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BaseService } from 'src/services/base.service';
import { bind } from 'src/functions';

@Component({
  selector: 'app-session-info-bar',
  templateUrl: './session-info-bar.component.html',
  styleUrls: ['./session-info-bar.component.scss']
})
export class SessionInfoBarComponent implements OnInit {

  constructor(private _base: BaseService) { }

  @Input() session: Session;
  @Input() player: Player;
  @Input() players: Player[];

  faUser = faUser;


  ngOnInit() {
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

}

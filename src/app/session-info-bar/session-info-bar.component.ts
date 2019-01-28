import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { teamPipe } from 'src/enums/team.enum';
import { rolePipe } from 'src/enums/role.enum';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-session-info-bar',
  templateUrl: './session-info-bar.component.html',
  styleUrls: ['./session-info-bar.component.scss']
})
export class SessionInfoBarComponent implements OnInit {

  constructor() { }

  @Input() session: Session;
  @Input() player: Player;

  faUser = faUser;


  ngOnInit() {
  }

  clickUser(): void {
    alert(`You are a ${teamPipe(this.player.team)}: ${rolePipe(this.player.role)}`)
  }

}

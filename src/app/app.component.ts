import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stage } from 'src/enums/stage.enum';
import { NavService } from 'src/services/nav.service';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { teamPipe } from 'src/enums/team.enum';
import { rolePipe } from 'src/enums/role.enum';
import { bind } from 'src/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _navService: NavService){}

  title = 'resistance-app';
  Stage = Stage;
  stage = Stage.NotBegun;
  session: Session;
  player: Player;
  teamPipe = teamPipe;
  rolePipe = rolePipe;

  ngOnInit(): void {
  }

  stageIsVisible(stage: Stage): boolean {
    return this.stage === stage;
  }

  goToStage(stage: Stage) {
    this._navService.goToStage(stage);
  }

  joinedServer(session: Session){
    this._navService.connectToRoom(session.roomCode);

    this._navService.currentStage.subscribe(bind(this,'stage'));
    this.session = session;
  }

  roleAssigned(player: Player){
    this.player = player;
  }
}

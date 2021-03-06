import { Component, OnInit } from '@angular/core';
import { Stage } from 'src/enums/stage.enum';
import { NavService } from 'src/services/nav.service';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { teamPipe } from 'src/enums/team.enum';
import { rolePipe } from 'src/enums/role.enum';
import { bind } from 'src/functions';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _navService: NavService, private _sessionService: SessionService){}

  title = 'resistance-app';
  Stage = Stage;
  stage = Stage.NotBegun;
  session: Session;
  player: Player;
  players: Player[];
  teamPipe = teamPipe;
  rolePipe = rolePipe;

  ngOnInit(): void {
    this._sessionService.roomCode$.subscribe((roomCode) => {
      this.connectToRoom(roomCode);
    })
  }

  stageIsVisible(stage: Stage): boolean {
    return this.stage === stage;
  }

  goToStage(stage: Stage) {
    this._navService.goToStage(stage);
  }

  connectToRoom(roomCode: string){
    this._navService.connectToRoom(roomCode);

    this._navService.currentStage.subscribe(bind(this,'stage'));
  }

  get canSeeGameBoard(): boolean {
    const unallowedStages = [Stage.NotBegun,Stage.RoleReveal];

    return !unallowedStages.some((unallowedStage) => unallowedStage === this.stage);
  }
}

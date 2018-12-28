import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stage } from 'src/enums/stage.enum';
import { NavService } from 'src/services/nav.service';
import { PageEvent } from '@angular/material';
import { Session } from 'src/models/session';

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

    this._navService.currentStage.subscribe((currentStage) => {
      this.stage = currentStage;
    });
    this.session = session;
  }
}

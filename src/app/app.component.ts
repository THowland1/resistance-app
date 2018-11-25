import { Component, OnInit } from '@angular/core';
import { Stage } from 'src/enums/stage.enum';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'resistance-app';
  Stage = Stage;
  stage = Stage.NotBegun;

  constructor(private _navService: NavService){}

  ngOnInit(): void {
    this._navService.currentStageObservable.subscribe((currentStage) => {
      this.stage = currentStage;
    });
  }

  stageIsVisible(stage: Stage): boolean {
    return this.stage === stage;
  }

  goToStage(stage: Stage) {
    this._navService.goToStage(stage);
  }

}

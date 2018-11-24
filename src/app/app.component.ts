import { Component } from '@angular/core';
import { Stage } from 'src/enums/stage.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resistance-app';
  Stage = Stage;
  stage = Stage.Landing;

  stageIsVisible(stage: Stage): boolean {
    return this.stage === stage;
  }

  goToStage(stage: Stage) {
    this.stage = stage;
  }

}

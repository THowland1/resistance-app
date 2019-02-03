import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';
import { RoleRevealPageComponent } from './pages/role-reveal-page/role-reveal-page.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { MissionPageComponent } from './pages/mission-page/mission-page.component';
import { TeamPickPageComponent } from './pages/team-pick-page/team-pick-page.component';
import { GameOverPageComponent } from './pages/game-over-page/game-over-page.component';
import { StageGuard } from '../guards/stage.guard';
import { Stage, stageUrlPipe } from 'src/enums/stage.enum';

const routes: Routes = [
  { 
    path: stageUrlPipe(Stage.NotBegun), 
    component: LobbyPageComponent 
  },
  { 
    path: stageUrlPipe(Stage.RoleReveal), 
    component: RoleRevealPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.RoleReveal} 
  },
  { 
    path: stageUrlPipe(Stage.TeamPick), 
    component: TeamPickPageComponent,
    canActivate: [StageGuard], 
    data:{stage: Stage.TeamPick} 
  },
  {
    path: stageUrlPipe(Stage.Vote),
    component: VotePageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.Vote} 
  },
  {
    path: stageUrlPipe(Stage.Mission), 
    component: MissionPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.Mission} 
  },
  { 
    path: stageUrlPipe(Stage.GameOver), 
    component: GameOverPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.GameOver} 
  },
  { 
    path: '**',
    redirectTo: stageUrlPipe(Stage.NotBegun),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [StageGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

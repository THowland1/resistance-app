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
import { InvestigatePageComponent } from './pages/investigate-page/investigate-page.component';
import { HuntPageComponent } from './pages/hunt-page/hunt-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: LobbyPageComponent 
  },
  { 
    path: 'role-reveal', 
    component: RoleRevealPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.RoleReveal} 
  },
  { 
    path: 'team-pick', 
    component: TeamPickPageComponent,
    canActivate: [StageGuard], 
    data:{stage: Stage.TeamPick} 
  },
  {
    path: 'vote',
    component: VotePageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.Vote} 
  },
  {
    path: 'investigate',
    component: InvestigatePageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.Investigate} 
  },
  {
    path: 'hunt',
    component: HuntPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.Hunt} 
  },
  {
    path: 'mission', 
    component: MissionPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.Mission} 
  },
  { 
    path: 'game-over', 
    component: GameOverPageComponent, 
    canActivate: [StageGuard], 
    data:{stage: Stage.GameOver} 
  },
  { 
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [StageGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }

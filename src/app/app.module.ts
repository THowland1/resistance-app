import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';
import { RoleRevealPageComponent } from './pages/role-reveal-page/role-reveal-page.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevComponent } from './components/dev/dev.component';
import { TeamPickPageComponent } from './pages/team-pick-page/team-pick-page.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { MissionPageComponent } from './pages/mission-page/mission-page.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameOverPageComponent } from './pages/game-over-page/game-over-page.component';
import { SessionInfoBarComponent } from './components/session-info-bar/session-info-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LobbyPageComponent,
    RoleRevealPageComponent,
    DevComponent,
    TeamPickPageComponent,
    VotePageComponent,
    MissionPageComponent,
    GameBoardComponent,
    GameOverPageComponent,
    SessionInfoBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    FontAwesomeModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }

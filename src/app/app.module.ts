import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';
import { RoleRevealPageComponent } from './role-reveal-page/role-reveal-page.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevComponent } from './dev/dev.component';
import { TeamPickPageComponent } from './team-pick-page/team-pick-page.component';
import { VotePageComponent } from './vote-page/vote-page.component';
import { MissionPageComponent } from './mission-page/mission-page.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyPageComponent,
    RoleRevealPageComponent,
    DevComponent,
    TeamPickPageComponent,
    VotePageComponent,
    MissionPageComponent,
    GameBoardComponent
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
    MatInputModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }

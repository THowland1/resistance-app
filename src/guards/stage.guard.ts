
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/services/session.service';
import { GameService } from 'src/services/game.service';
import { Stage, stageUrlPipe } from 'src/enums/stage.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StageGuard implements CanActivate {
  constructor(private _sessionService: SessionService, private _gameService: GameService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // the page is unreachable if the user is not in a room
      if (this._sessionService.roomCode === undefined){
        this.router.navigate([stageUrlPipe(Stage.NotBegun)]);
        return false;
      }
      // the page is unreachable if the room's game is not at the current stage
      const stage = next.data['stage'] as Stage;
      return this._gameService.get('stage')
        .pipe(map((currentStage) => {
          const isSameStage = currentStage === stage;
          if(!isSameStage){
            this.router.navigate([stageUrlPipe(Stage.NotBegun)]);
          }
          return isSameStage;
        }));
  }
}

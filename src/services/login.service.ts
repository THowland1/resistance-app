import { Injectable } from '@angular/core';
import { newGame } from 'src/models/game';
import { first, map } from 'rxjs/operators';
import { Stage } from 'src/enums/stage.enum';
import { Session } from 'src/models/session';
import { newPlayer } from 'src/models/player';
import { Observable, zip } from 'rxjs';
import { BaseService } from './base.service';
import { gameVariables } from 'src/game.variables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private base: BaseService) {}

  joinLobby(session: Session): Observable<void> {
    const name = session.name;
    const roomCode = session.roomCode;
    console.log(`user "${name}" attempting to join room ${roomCode}`);
    
    return new Observable((observer) => {
      zip(
        this.doesRoomExist(roomCode),
        this.isNameTaken(session),
        this.isRoomFull(roomCode),
        this.hasGameStarted(roomCode))
        .pipe(first())
        .subscribe(([roomExists,nameIsTaken,isRoomFull,hasGameStarted]) => {
          if (!roomExists) {
            observer.error('This room does not exist');
          }
          if (isRoomFull) {
            observer.error('This room is full')
          }
          if (nameIsTaken) {
            observer.error('Name is already taken');
          }
          if (hasGameStarted) {
            observer.error('Game has already started');
          }

          if (roomExists && !nameIsTaken && !isRoomFull && !hasGameStarted) {
            this.base.addPlayer(roomCode, newPlayer(session.name));
          }

          observer.complete();
        });
    })
  }

  createLobby(name: string): Observable<string> {
    var roomCode: string
    var everythingIsOkay: boolean;
    var noOfAttempts = 0;
    return new Observable((observer)=>{
      do {
        roomCode = this.randomRoomCode();
        everythingIsOkay = true;
        noOfAttempts++;
  
        this.doesRoomExist(roomCode)
          .pipe(first())
          .subscribe((exists) => {
            if (exists) {
              everythingIsOkay = false;
            } else {
              this.base.addGame(roomCode, newGame());
              observer.next(roomCode);
            }
          });
      } while (!everythingIsOkay && noOfAttempts < 200);

      if (!everythingIsOkay){
        observer.error('Something has gone wrong');
      }
    });
  }

  private randomRoomCode(): string {
    return this.base.idGenerator();
  }

  private doesRoomExist(roomCode: string): Observable<boolean> {
    return this.base.doesDocExist('game',roomCode);
  }

  private isNameTaken(session: Session): Observable<boolean> {
    return this.base.doesDocExist('game',session.roomCode,'player',session.name);
  }

  private isRoomFull(roomCode: string): Observable<boolean> {
    return this.base.getPlayers(roomCode)
      .pipe(map((players) => players.length >= gameVariables.maxPlayers ));
  }

  private hasGameStarted(roomCode: string): Observable<boolean> {
    return this.base.getGameProperty('stage',roomCode)
      .pipe(map((stage: Stage) => stage !== Stage.NotBegun));
  }

}

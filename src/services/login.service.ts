import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { first, map } from 'rxjs/operators';
import { Stage } from 'src/enums/stage.enum';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { Team } from 'src/enums/team.enum';
import { Role } from 'src/enums/role.enum';
import { Observable, zip } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private base: BaseService) {}

  private _maxPlayers = 9;

  joinLobby(session: Session): Observable<void> {
    const name = session.name;
    const roomCode = session.roomCode;
    console.log(`user "${name}" attempting to join room ${roomCode}`);
    
    return new Observable((observer) => {
      zip(
        this.doesRoomExist(roomCode),
        this.isNameTaken(session),
        this.isRoomFull(roomCode))
        .pipe(first())
        .subscribe(([roomExists,nameIsTaken,isRoomFull]) => {
          if (!roomExists) {
            observer.error('This room does not exist');
          }
          if (isRoomFull) {
            observer.error('This room is full')
          }
          if (nameIsTaken){
            observer.error('Name is already taken');
          }

          if (roomExists && !nameIsTaken && !isRoomFull) {
            this.base.addPlayer(roomCode,this.newPlayer(session.name));
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
              this.base.addGame(roomCode, this.newGame);
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
    return this.base.getPlayers()
      .pipe(map((players) => players.length >= this._maxPlayers))
  }

  private newGame: Game = {
    stage: Stage.NotBegun
  };

  private newPlayer(name: string): Player {
    return {
        name,
        team: Team.unassigned,
        role: Role.unassigned
      }
  }

}

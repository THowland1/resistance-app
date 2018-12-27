import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first, map } from 'rxjs/operators';
import { Stage } from 'src/enums/stage.enum';
import { Session } from 'src/models/session';
import { Player } from 'src/models/player';
import { Team } from 'src/enums/team.enum';
import { Role } from 'src/enums/role.enum';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFirestore) {
    this._gameCollection = this.db.collection<Game>('game');
  }

  private _gameCollection: AngularFirestoreCollection<Game>
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
            this.player(session).set(this.newPlayer(session.name));
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
              this.room(roomCode).set(this.newGame);
              observer.next(roomCode);
            }
          });
      } while (!everythingIsOkay && noOfAttempts < 200);

      if (!everythingIsOkay){
        observer.error('Something has gone wrong');
      }
    });
  }

  leaveLobby(result: Session){
    const name = result.name;
    const roomCode = result.roomCode;

    console.log(`user "${name}" attempting to leave room ${roomCode}`);

    this.doesRoomExist(roomCode)
      .subscribe((exists) => {
        if (exists) {
          // leave it
          // delete it
          this.room(roomCode).delete()
          .then(() => {console.log('deleted room')})
          .catch(() => {console.log('couldnt delete room')});
        } else {
          // throw error
          console.log('The room does not exist')
        }
      });

  }

  private room(roomCode: string): AngularFirestoreDocument<Game> {
    return this._gameCollection.doc(roomCode);
  }

  private player(session: Session): AngularFirestoreDocument<Player> {
    return this.room(session.roomCode).collection('player').doc(session.name);
  }

  private randomRoomCode(): string {
    return this.db.createId().slice(0, 4).toUpperCase();
  }

  private doesRoomExist(roomCode: string): Observable<boolean> {
    return this.room(roomCode).get()
      .pipe(map((doc) => doc.exists));
  }

  private isNameTaken(session: Session): Observable<boolean> {
    return this.player(session).get()
      .pipe(map((doc) => doc.exists));
  }

  private isRoomFull(roomCode: string): Observable<boolean> {
    return this.room(roomCode).collection('player').valueChanges()
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

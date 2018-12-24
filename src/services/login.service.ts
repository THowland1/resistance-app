import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { take, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Stage } from 'src/enums/stage.enum';
import { Session } from 'src/models/session';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFirestore) {
    this._gameCollection = this.db.collection<Game>('game');
  }

  private _gameCollection: AngularFirestoreCollection<Game>


  joinLobby(result: Session): Observable<void> {
    const name = result.name;
    const roomCode = result.roomCode;

    console.log(`user "${name}" attempting to join room ${roomCode}`);

    return new Observable((observer) => {
    this.doesRoomExist(roomCode)
      .subscribe((exists) => {
        if (exists) {
          // join it
          observer.complete()
        } else {
          // throw error
          observer.error('This room does not exist');
        }
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
              this._gameCollection.doc(roomCode).set(this.newGame);
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
          this._gameCollection.doc(roomCode).delete()
          .then(() => {console.log('deleted room')})
          .catch(() => {console.log('couldnt delete room')});
        } else {
          // throw error
          console.log('The room does not exist')
        }
      });

  }

  private randomRoomCode(): string {
    return this.db.createId().slice(0, 4).toUpperCase();
  }

  private doesRoomExist(roomCode: string): Observable<boolean> {
    return this._gameCollection.doc(roomCode).get()
      .pipe(
        first(),
        map((doc) => doc.exists));
  }

  private newGame: Game = {
    stage: Stage.NotBegun
  };

}

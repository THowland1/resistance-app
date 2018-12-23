import { Injectable } from '@angular/core';
import { Game } from 'src/models/game';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { take, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Stage } from 'src/enums/stage.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFirestore) {
    this._gameCollection = this.db.collection<Game>('game');
  }

  private _gameCollection: AngularFirestoreCollection<Game>


  joinLobby(result: { name: string, roomCode: string }): void {
    const name = result.name;
    const roomCode = result.roomCode;

    console.log(`user "${name}" attempting to join room ${roomCode}`);

    this.doesRoomExist(roomCode)
      .subscribe((exists) => {
        if (exists) {
          // join it

        } else {
          // throw error
        }
      });


  }

  createLobby(name: string): void {
    var roomCode: string
    var everythingIsOkay: boolean;
    var noOfAttempts = 0

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
          }
        });
    } while (!everythingIsOkay && noOfAttempts < 200);

    if (everythingIsOkay){
      this.joinLobby({name, roomCode});
    }
  }

  private randomRoomCode(): string {
    return this.db.createId().slice(0, 4);
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

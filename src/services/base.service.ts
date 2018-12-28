import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/models/player';
import { Game, GameProperty } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private db: AngularFirestore) {}
  game: AngularFirestoreDocument<Game>;

  gameString: string = 'game';
  playerString: string = 'player';
  

  // Meta
  doesDocExist(...queryParts: string[]): Observable<boolean> {
    const queryString = queryParts.join('/')
    return this.db.doc(queryString).get()
      .pipe(map((metaData) => metaData.exists));
  }

  connectToRoom(roomCode: string): void {
    this.game = this.db.collection(this.gameString).doc(roomCode);
  }

  idGenerator(): string {
    return this.db.createId().slice(0, 4).toUpperCase();
  }

  // Game
  getGameProperty(property: GameProperty): Observable<any> {
    return this.game
      .valueChanges()
          .pipe(map((o) => o[property]));
  }

  updateGameProperty(property: GameProperty, value: any): void {
    const data = {};
    data[property] = value;
    this.game.update(data);
  }

  addGame(roomCode: string, game: Game) {
    this.db.collection<Game>(this.gameString).doc(roomCode).set(game);
  }

  // Player
  getPlayers(): Observable<Player[]> {
    if (!!this.game) {
      return this.game.collection<Player>(this.playerString)
        .valueChanges();
    } else {
      return of([]); // no players if room doesn't exist
    }
  }

  addPlayer(roomCode: string, player: Player){
    this.db.collection(`${this.gameString}/${roomCode}/${this.playerString}`).doc(player.name).set(player);
  }
  
}

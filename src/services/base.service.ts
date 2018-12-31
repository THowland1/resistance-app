import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, PlayerProperty } from 'src/models/player';
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
  getGameProperty(property: GameProperty, roomCode?: string): Observable<any> {
    const game = !!roomCode ? this.db.doc(`${this.gameString}/${roomCode}`) : this.game;

    return game.valueChanges()
      .pipe(map((o) => !!o ? o[property] : null));
  }

  updateGameProperty(property: GameProperty, value: any, roomCode?:string): void {
    const game = !!roomCode ? this.db.doc(`${this.gameString}/${roomCode}`) : this.game;
    const data = {};
    data[property] = value;
    game.update(data);
  }

  addGame(roomCode: string, game: Game) {
    this.db.collection<Game>(this.gameString).doc(roomCode).set(game);
  }

  // Player
  getPlayers(roomCode?: string): Observable<Player[]> {
    const game = !!roomCode ? this.db.doc(`${this.gameString}/${roomCode}`) : this.game;

    return game.collection<Player>(this.playerString)
      .valueChanges();
  }

  getPlayerProperty(property: PlayerProperty, name: string, roomCode?: string): Observable<any> {
    const game = !!roomCode ? this.db.doc(`${this.gameString}/${roomCode}`) : this.game;

    return game.collection(this.playerString).doc(name).valueChanges()
      .pipe(map((o) => o[property]));
  }

  updatePlayerProperty(property: PlayerProperty, value: any, name: string, roomCode?:string): void {
    const game = !!roomCode ? this.db.doc(`${this.gameString}/${roomCode}`) : this.game;
    const data = {};
    data[property] = value;
    game.collection(this.playerString).doc(name).update(data);
  }

  addPlayer(roomCode: string, player: Player){
    this.db.collection(`${this.gameString}/${roomCode}/${this.playerString}`).doc(player.name).set(player);
  }
  
}

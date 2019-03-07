import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Player } from 'src/models/player';
import { Game } from 'src/models/game';
import { Mission } from 'src/models/mission';


export type DocProperty = keyof Mission | keyof Player;
export type CollectionType = '' | 'player' | 'mission';
export type CollectionInterface = Player | Mission;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private db: AngularFirestore) {}
  storedGame: AngularFirestoreDocument<Game>;
  private _batch = this.db.firestore.batch();

  gameString: string = 'game';
  playerString: string = 'player';
  missionString: string = 'mission';

  // Meta
  game(roomCode?: string): AngularFirestoreDocument<Game> {
    return !!roomCode
      ? this.db.doc<Game>(`${this.gameString}/${roomCode}`)
      : this.storedGame;
  }

  doesDocExist(collection: CollectionType, ref: string, roomCode?: string): Observable<boolean> {
    const doc = collection === ''
      ? this.game(roomCode)
      : this.game(roomCode).collection(collection).doc(ref);

    return doc.get()
      .pipe(map((metaData) => metaData.exists));
  }

  connectToRoom(roomCode: string): void {
    this.storedGame = this.db.collection(this.gameString).doc(roomCode);
  }

  idGenerator(): string {
    return this.db.createId().slice(0, 4).toUpperCase();
  }

  // Game
  getGame(roomCode?: string): Observable<Game> {
    return this.game(roomCode).valueChanges();
  }


  addGame(roomCode: string, game: Game): void {
    this.game(roomCode).set(game);
  }
  
  // General
  collectionBuilder(collection: CollectionType, ref: string, subcollection: CollectionType): CollectionType {
    return `${collection}/${ref}/${subcollection}` as CollectionType;
  }
  
  getCollection<T>(collection: CollectionType, roomCode?: string): Observable<T[]> {
    return this.game(roomCode).collection<T>(collection)
      .valueChanges();
  }
  
  update(roomCode:string, collection: CollectionType, reference: string, property: DocProperty, value: any): void {
    const documentReference = this.db.firestore.doc(`game/${roomCode}/${collection}/${reference}`);
    const data = {};
    data[property] = value;

    this._batch.update(documentReference,data)
  }

  saveChanges(): Promise<void> {
    return this._batch.commit();
  }
  
  addDoc(collection: CollectionType, doc: CollectionInterface, reference: string, roomCode?: string): void{
    this.game(roomCode).collection(collection).doc(reference)
      .set(doc);
  }
  
  getDocFromArrayIndex<T>(collection: CollectionType, index: number, roomCode?: string): Observable<T> {
    return this.getCollection<T>(collection, roomCode)
      .pipe(map((docArray) => docArray[index]));
  }
}

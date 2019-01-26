import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Player, PlayerProperty } from 'src/models/player';
import { Game, GameProperty } from 'src/models/game';
import { Mission, MissionProperty } from 'src/models/mission';

export enum CollectionEnum {
  player = 0,
  mission = 1
}

export function hello() {return 'hello';}

export type DocProperty = MissionProperty | PlayerProperty;
export type CollectionType = '' | 'player' | 'mission';
export type CollectionInterface = Player | Mission;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private db: AngularFirestore) {}
  storedGame: AngularFirestoreDocument<Game>;

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

  getGameProperty<T>(property: GameProperty, roomCode?: string): Observable<T> {
    return this.game(roomCode).valueChanges()
      .pipe(map((o) => !!o ? o[property] as unknown as T : null));
  }

  updateGameProperty(property: GameProperty, value: any, roomCode?:string): void {
    const data = {};
    data[property] = value;
    this.game(roomCode).update(data);
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
  
  getCollectionCount(collection: CollectionType, roomCode?: string): Observable<number> {
    return this.game(roomCode).collection(collection)
      .get()
      .pipe(map((snapshot) => snapshot.size));
  }
  
  getDocProperty<T>(collection: CollectionType, reference: string, property: DocProperty, roomCode?: string): Observable<T>{
    return this.game(roomCode).collection(collection).doc(reference)
      .valueChanges()
      .pipe(map((o) => !!o ? o[property] : null));
  }
  
  updateDocProperty(collection: CollectionType, reference: string, property: DocProperty, value: any, roomCode?:string): void {
    const data = {};
    data[property] = value;
    
    this.game(roomCode).collection(collection).doc(reference)
      .update(data);
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

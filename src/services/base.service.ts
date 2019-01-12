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

export type DocProperty = MissionProperty | PlayerProperty;
export type CollectionType = 'player' | 'mission';
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

  doesDocExist(...queryParts: string[]): Observable<boolean> {
    const queryString = queryParts.join('/')
    return this.db.doc(queryString).get()
      .pipe(map((metaData) => metaData.exists));
  }

  connectToRoom(roomCode: string): void {
    this.storedGame = this.db.collection(this.gameString).doc(roomCode);
  }

  idGenerator(): string {
    return this.db.createId().slice(0, 4).toUpperCase();
  }

  // Game
  getGameProperty(property: GameProperty, roomCode?: string): Observable<any> {
    return this.game(roomCode).valueChanges()
      .pipe(map((o) => !!o ? o[property] : null));
  }

  updateGameProperty(property: GameProperty, value: any, roomCode?:string): void {
    const data = {};
    data[property] = value;
    this.game(roomCode).update(data);
  }

  addGame(roomCode: string, game: Game) {
    this.db.collection<Game>(this.gameString).doc(roomCode).set(game);
  }
  
  // Player
  getPlayers(roomCode?: string): Observable<Player[]> {
    return this.getCollection<Player>('player', roomCode);
  }

  getPlayerProperty<T>(property: PlayerProperty, name: string, roomCode?: string): Observable<T> {
    return this.getDocProperty<T>('player', property, name, roomCode);
  }

  updatePlayerProperty(property: PlayerProperty, value: any, name: string, roomCode?:string): void {
    this.updateDocProperty('player', property, value, name, roomCode);
  }

  playerCount(roomCode?: string): Observable<number> {
    return this.getCollectionCount('player', roomCode);
  }

  addPlayer(roomCode: string, player: Player){
    this.addDoc('player',player, player.name, roomCode);
  }

  getPlayerRefNo(name: string, roomCode?: string): Observable<number> {
    const observable = !!roomCode ? this.getPlayers(roomCode) : this.getPlayers();
    return observable
      .pipe(
        map(
          (players) => players.findIndex((player) => player.name === name)
        )
      );
  }

  getPlayerFromRefNo(refNo: number, roomCode?: string): Observable<Player> {
    const observable = !!roomCode ? this.getPlayers(roomCode) : this.getPlayers();
    return observable
      .pipe(
        map(
          (players) => players[refNo]
        )
      );
  }

  // Mission
  getMissions(roomCode?: string): Observable<Mission[]> {
    return this.getCollection<Mission>('mission', roomCode);
  }

  getMissionProperty<T>(property: MissionProperty, missionNo: number, roomCode?: string): Observable<T> {
    return this.getDocProperty<T>('mission', property,missionNo.toString(),roomCode);
  }

  missionCount(roomCode?: string): Observable<number> {
    return this.getCollectionCount('mission');
  }

  addMission(mission: Mission, missionNo: number, roomCode?: string): void{
    this.addDoc('mission', mission, missionNo.toString(), roomCode);
  }

  // General
  private getCollection<T>(collection: CollectionType, roomCode?: string): Observable<T[]> {
    return this.game(roomCode).collection<T>(collection)
      .valueChanges();
  }
  
  private getCollectionCount(collection: CollectionType, roomCode?: string): Observable<number> {
    return this.game(roomCode).collection(collection)
      .get()
      .pipe(map((snapshot) => snapshot.size));
  }

  private getDocProperty<T>(collection: CollectionType, property: DocProperty, reference: string, roomCode?: string): Observable<T>{
    return this.game(roomCode).collection(collection).doc(reference)
      .valueChanges()
      .pipe(map((o) => o[property]));
  }

  private updateDocProperty(collection: CollectionType, property: DocProperty, value: any, reference: string, roomCode?:string): void {
    const data = {};
    data[property] = value;

    this.game(roomCode).collection(collection).doc(reference)
      .update(data);
  }

  private addDoc(collection: CollectionType, doc: CollectionInterface, reference: string, roomCode?: string): void{
    this.game(roomCode).collection(collection).doc(reference)
      .set(doc);
  }
  
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore'
import { Stage } from 'src/enums/stage.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  game: AngularFirestoreDocument<Game>;
  constructor(private db: AngularFirestore) {}

  isConnectedToARoom$ = new BehaviorSubject<boolean>(false);

  connectToRoom(roomCode: string) {
    this.game = this.db.collection('game').doc(roomCode);
    this.isConnectedToARoom$.next(true);
  }

  get currentStageObservable(): Observable<Stage> {
    return this.game
      .valueChanges()
      .pipe(map((o) => !!o ? o.stage : null));
  }

  get currentPlayersObservable(): Observable<Player[]> {
    return this.game.collection<Player>('player')
      .valueChanges();
  }

  goToStage(stage: Stage) {
    this.game.update({stage: stage})
  }
}  

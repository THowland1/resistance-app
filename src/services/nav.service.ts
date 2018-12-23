import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore'
import { Stage } from 'src/enums/stage.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  game: AngularFirestoreDocument<Game>;
  constructor(private db: AngularFirestore) {
    this.game = db.collection<Game>('game').doc('xlTlGvOUEsUDGphn9D0i');
  }

  get currentStageObservable(): Observable<Stage> {
    return this.game
      .valueChanges()
      .pipe(map((o) => o.stage));
  }

  goToStage(stage: Stage) {
    this.game.update({stage: stage})
  }
}  

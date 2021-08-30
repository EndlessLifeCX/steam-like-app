import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { first, map } from 'rxjs/operators';
import { Game } from '../models/game';
@Injectable({
  providedIn: 'root'
})
export class GamesService {
  userData: Observable<firebase.User | null>;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
  ) { 
    this.userData = angularFireAuth.authState;
  }
  
  public getAllGames ():Observable<Game[]>{
   const changes = this.firestore.collection('games').snapshotChanges()
   .pipe( map((snaps) =>
   snaps.map((snap) => {
     return ({
       id: snap.payload.doc.id,
        gameTitle: snap.payload.doc.get('gameTitle'),
        cost:snap.payload.doc.get('cost'),
        gameTags:snap.payload.doc.get('gameTags'),
        description:snap.payload.doc.get('description')

     });
   }),
 ),
 first(),
);
   return changes
  }
}

import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable, of, SchedulerLike } from 'rxjs';
import firebase from 'firebase';
import { first, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account, Friend } from '../models/account';
import { Game } from '../models/game';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userData: Observable<firebase.User|null>;
  constructor(private firestore: AngularFirestore, private angularFireAuth: AngularFireAuth,) { 
    this.userData = angularFireAuth.authState;

  }
  public async getUserData(){
     this.userData.subscribe(x=>console.log(x?.uid))
    const userData = await this.userData.pipe( 
      first()
     ).toPromise();
     return userData
  }
  public async getAccount () {
    let userData = await this.getUserData()
     const res = this.firestore.collection('users').doc(userData?.uid).snapshotChanges()
      .pipe(map(account => ({...account.payload.data() as Account}) ),
    first(),
   ).toPromise();
  return res;
 }

  public async getFriends(): Promise<Observable<Friend[]>>{
    const userData = await this.getUserData()
    const friends1 =   (await this.firestore.collection('friendList').ref.where('user1','==','user1').get()).docs.map(x=>x.data() as Friend)
    const friends2 =  (await this.firestore.collection('friendList').ref.where('Requested','==','userId1').get()).docs.map(x=>x.data() as Friend)
    const allFriends= friends1.concat(friends2)
    const friends$ = of(allFriends)
    return friends$
  }

  public async getUserLibrary(){
    let userData = await this.getUserData()
    const library = this.firestore.collection('users').doc(userData?.uid).snapshotChanges()
    .pipe(map(account => (account.payload.get('library')) ),
  first(),
 ).toPromise();
return library;
  }
  public async getGamesFromLibrary(){
    let lib = await this.getUserLibrary()
    let gamesArr=[]
    for(let item in lib){
      const res = await this.firestore.collection('games').doc(lib[item]).get()
      .pipe(map(account => ({...account.data() as Game}) ),
      first(),
     ).toPromise();
     gamesArr.push(res)
    }
    return gamesArr

  }
}

 

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

  public async searchFriends(name:string):Promise<Observable<any>>{
    const friends =  (await this.firestore.collection('users').ref.where('username', '>=', name).where('username', '<=', name + '\uf8ff').get()).docs.map(x=>x.data() );
    const friends$ = of(friends)
    return friends$
  }
  public async getFriends(): Promise<Observable<Friend[]>>{
    const userData = await this.getAccount()
    const friends1 =   (await this.firestore.collection('friendList').ref.where('user1','==',userData.username).get()).docs.map(x=>x.data() as Friend)
    const friends2 =  (await this.firestore.collection('friendList').ref.where('user2','==', userData.username).get()).docs.map(x=>x.data() as Friend)
    const allFriends= friends1.concat(friends2)
    const friends$ = of(allFriends)
    return friends$
  }
  public changeAccData(age:number,username:string,email:string){
    this.userData.subscribe(async userData=>{
    const uid = userData?.uid
  await this.firestore.collection('users').doc(uid).update({
      age:age,
      username:username,
      email:email,
    }).then(()=>console.log('Succesfully changed')).catch(err=>console.log(err))
  })

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

 

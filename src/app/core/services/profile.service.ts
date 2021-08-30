import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { first, map ,mergeMap, withLatestFrom} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account } from '../models/account';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userData: Observable<firebase.User|null>;
  constructor(private firestore: AngularFirestore, private angularFireAuth: AngularFireAuth,) { 
    this.userData = angularFireAuth.authState;

  }
 
  public async getAccount () {
  const userData = await this.userData.pipe( 
 first()
).toPromise();
    userData?.uid
    // console.log(userData?.uid)
// const uid = x.subscribe(x=>x?.uid)
// console.log(uid)
     const res = this.firestore.collection('users').doc(userData?.uid).snapshotChanges()
      .pipe(map(account => ({...account.payload.data() as Account}) ),
    first(),
   ).toPromise();
  return res;
 }

}

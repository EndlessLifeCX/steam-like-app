import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<firebase.User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log('Successfully signed up!', res);
        const uid =  res.user?.uid
        if(uid){
            console.log(uid)
        this.firestore.firestore.collection('users').doc(uid).set({
            age:0,
            email:res.user?.email,
            username:'korelian',
        }).then((wa)=>{
          
            console.log('doc written with id:', wa, "uid: ",uid)
        }).then(()=>
        this.firestore.collection('users').doc(uid).collection('library').add({}))
        .then((res)=>
        this.router.navigateByUrl('/mainPage')
        ).catch(err=>console.log('err:', err))
        
            
        }
        else{
            console.log('smth went wrong')
        }
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed in!', res);
        this.router.navigateByUrl('/mainPage');
      })
      .catch((err) => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .signOut()
      .then((res) => {
        console.log('u did signout');
        this.router.navigateByUrl('/login');
      })
      .catch((err) => console.log(err));
  }

  isLoggedIn() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }
}

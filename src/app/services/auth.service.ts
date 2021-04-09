import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  name?: string;
  image?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
  }

  async signUp({ email, password}) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log('result: ', credential);
    const uid = credential.user.uid;

    return this.afs.doc(
      `users/${uid}`
      ).set({
        uid,
        email: credential.user.email,
        name: credential.user.email.split('@')[0],
        image: 'notdefined'
      });
  }

  signIn({ email, password}) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  async getCurrentUser() {
    return (await this.afAuth.currentUser).uid;
  }

  getUserProfile()  {
    const observable = new Observable((observer) => {
      this.getCurrentUser().then( uid => {
        // console.log('User UID: ', uid);
        this.afs.collection('users').doc(uid).valueChanges().subscribe( (profile: User) => {
          if ( profile.image === 'notdefined') {
            profile.image = 'assets/undraw_male_avatar_323b.svg';
          }
          observer.next(profile);
          observer.complete();
        });
      });
    });
    return observable;
  }
}

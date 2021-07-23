import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from 'src/app/services/auth.service';

// export interface User {
//   uid: string;
//   email: string;
//   name?: string;
//   image?: string;
//   phone?: string;
// }

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
  }

  addChatMessage(msg) {
    return this.afs.collection('messages').add({
      msg: {msg}.msg,
      from: this.currentUser.uid,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }

  getChatMessage() {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users: ', users);
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id'}) as Observable<Message[]>;
      }),
      map(messages => {
        for (const m of messages) {
          m.fromName = this.getUserProfile(m.from, users).name;
          m.user = this.getUserProfile(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        console.log('all messages: ', messages);
        return messages;
      })
    );
  }

  getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  getUserProfile(msgFromId, users: User[]): User {
    for (const usr of users) {
      if (usr.uid === msgFromId) {
        if ( usr.image === 'notdefined' ) {
          usr.image = 'assets/undraw_male_avatar_323b.svg';
        }
        return usr;
      }
    }
    return null;
  }

}

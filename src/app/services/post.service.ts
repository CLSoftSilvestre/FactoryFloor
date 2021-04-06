import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  name?: string;
}

export interface Post {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  type: string;
  comments?: Comment[];
  countComments?: number;
}

export interface Comment {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUser: User = null;
  typeOfPost: string = null;

  users: User[];

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
                this.afAuth.onAuthStateChanged(user => {
                  console.log('Changed: ', user);
                  this.currentUser = user;
                });
  }

  addPostMessage(msg, type) {
    return this.afs.collection('posts').add({
      msg: {msg}.msg,
      from: this.currentUser.uid,
      type: {type}.type,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }

  addPostComment(msg, postId) {
    return this.afs.collection('posts').doc(postId).collection('comments').add({
      msg: {msg}.msg,
      from: this.currentUser.uid,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }

  getPostMessage() {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        this.users = res;
        console.log('all users: ', users);
        return this.afs.collection('posts', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id'}) as Observable<Post[]>;
      }),
      map(posts => {
        for (const m of posts) {
          m.from = this.getUserForPost(m.from, users);
          this.getPostComments(m.id).subscribe( comments => {
            m.comments = comments;
            m.countComments = comments.length;
          });
        }
        console.log('all post: ', posts);
        return posts;
      })
    );
  }

  getPostComments(messageId) {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('posts').doc(messageId)
        .collection('comments', ref => ref.orderBy('createdAt', 'desc'))
        .valueChanges({ idField: 'id' }) as Observable<Comment[]>;
      }),
      map(comments => {
        for (const c of comments) {
          c.fromName = this.getUserForPost(c.from, users);
        }
        return comments;
      })
    );
  }

  getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  getUserForPost(msgFromId, users: User[]): string {
    for (const usr of users) {
      if (usr.uid === msgFromId) {
        return usr.name;
      }
    }
    return 'Deleted';
  }

}

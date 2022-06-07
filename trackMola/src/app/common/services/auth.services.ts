/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, NgZone } from '@angular/core';
import {
  FireBaseResponse,
  FireStoreResponce,
  TypeUser,
  User,
} from '../interfaces';
import { Subject } from 'rxjs';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: FireBaseResponse | undefined;
  public error$: Subject<string> = new Subject<string>();
  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = JSON.parse(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.clear();
      }
    });
  }

  login(user: User) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        const userRef: AngularFirestoreDocument<FireStoreResponce> =
          this.angularFirestore.doc(`users/${result.user!.uid}`);
        userRef.get().subscribe((response) => {
          const userInfo: FireStoreResponce = response.data()!;
          switch (userInfo.type) {
            case TypeUser.Employee:
              void this.router.navigate(['employee']);
              break;
            case TypeUser.Manager:
              void this.router.navigate(['manager']);
              break;
            case TypeUser.CTO:
              void this.router.navigate(['cto']);
              break;
            case TypeUser.Admin:
              void this.router.navigate(['admin']);
              break;
          }
        });
      })
      .catch((error: Error) => {
        this.error$.next(error.message);
      });
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user')) {
      const userData: FireBaseResponse = JSON.parse(
        localStorage.getItem('user')!
      );
      const expDate = new Date(userData.stsTokenManager.expirationTime);
      if (new Date() > expDate) {
        void this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      void this.router.navigate(['/']);
    });
  }
}

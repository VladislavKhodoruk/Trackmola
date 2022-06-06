import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces';
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
  userData: unknown;
  public error$: Subject<string> = new Subject<string>();
  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
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
        const userRef: AngularFirestoreDocument<any> =
          this.angularFirestore.doc(`users/${result.user!.uid}`);

        userRef.get().subscribe((response) => {
          switch (response.data().type) {
            case 'Employee':
              this.router.navigate(['employee']);
              break;
            case 'Manager':
              this.router.navigate(['manager']);
              break;
            case 'CTO':
              this.router.navigate(['cto']);
              break;
            case 'Admin':
              this.router.navigate(['admin']);
              break;
          }
        });
      })
      .catch((error) => {
        this.error$.next(error.message);
      });
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user')) {
      const expDate = new Date(
        JSON.parse(localStorage.getItem('user')!).stsTokenManager.expirationTime
      );
      if (new Date() > expDate) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}

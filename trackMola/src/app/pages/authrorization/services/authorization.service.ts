import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { from } from 'rxjs';

import { FirebaseCodeErrorEnum } from '../enums/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  authorizationError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Invalid email';

      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Wrong password';

      case FirebaseCodeErrorEnum.UserNotFound:
        return 'User not found';

      default:
        return 'Error unknown';
    }
  }

  logout() {
    return from(this.auth.signOut());
  }
}

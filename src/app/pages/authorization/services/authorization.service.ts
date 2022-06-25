import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { ErrorAuthMessage, FirebaseCodeError } from '../enums/enum';

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
      case FirebaseCodeError.InvalidEmail:
        return ErrorAuthMessage.InvalidEmail;

      case FirebaseCodeError.WrongPassword:
        return ErrorAuthMessage.WrongPassword;

      case FirebaseCodeError.UserNotFound:
        return ErrorAuthMessage.UserNotFound;

      default:
        return ErrorAuthMessage.Unknown;
    }
  }

  logout() {
    localStorage.clear();
    return from(this.auth.signOut());
  }
}

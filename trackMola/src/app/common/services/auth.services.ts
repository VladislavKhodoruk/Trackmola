import {
  AuthorizationResponse,
  FireStoreResponce,
  UserFields,
  UserInfo,
} from './../interfaces';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthorizationResponse> {
    return this.http.post<AuthorizationResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
      { email, password, returnSecureToken: true }
    );
  }

  getUserInfo(uid: string): Observable<any> {
    return this.http.get(
      `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents/users/${uid}`
    );
  }

  createUserInfo(data: FireStoreResponce) {
    const userInfo: UserInfo = {};
    const userFields: UserFields = data.fields;
    for (const key in userFields) {
      userInfo[key] = userFields[key].stringValue;
    }
    return userInfo;
  }

  createUser(data: AuthorizationResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }
}

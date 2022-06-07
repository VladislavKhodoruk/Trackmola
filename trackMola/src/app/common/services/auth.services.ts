import { AuthorizationResponse } from './../interfaces';
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

  createUser(data: AuthorizationResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const authorizedUser = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return authorizedUser;
  }
  logout() {
    localStorage.removeItem('userData');
  }
}

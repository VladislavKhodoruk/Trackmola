import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';

import { AuthorizationService } from './services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private authorization: AuthorizationService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authorization.currentUser$.pipe(
      take(1),
      map((currentUser) => !!currentUser),
      tap((isAuthorized) => {
        if (!isAuthorized) {
          this.router.navigate(['/authorization']);
        }
      })
    );
  }
}

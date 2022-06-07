import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      void this.auth.logout();
      void this.router.navigate(['/']);
      return true;
    }
  }
}

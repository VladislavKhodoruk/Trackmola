import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsAuthentificated implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('AuthUserId')) {
      this.router.navigate(['dashboard']);
    }
    return true;
  }
}

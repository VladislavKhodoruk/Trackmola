import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Route } from '@shared/enums/enum';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticated implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('AuthUserId')) {
      this.router.navigate([Route.Dashboard]);
    }
    return true;
  }
}

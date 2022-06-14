import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UserType } from 'src/app/shared/enums/enum';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { getUserType } from '../authrorization/store/authrorization.selector';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private store: Store<TrackMolaState>, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.store.select(getUserType).pipe(
      map((type) => {
        if (type === UserType.Employee) {
          return true;
        }
        this.router.navigate(['/authrorization']);
        return false;
      })
    );
  }
}

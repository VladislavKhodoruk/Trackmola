import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Injectable({
  providedIn: 'root',
})
export class IsAuthentificated implements CanActivate {
  constructor(private store$: Store<TrackMolaState>, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.store$.select(getUserType).pipe(
      map((type) => {
        if (type) {
          return true;
        }
        this.router.navigate(['authorization']);
        return false;
      })
    );
  }
}

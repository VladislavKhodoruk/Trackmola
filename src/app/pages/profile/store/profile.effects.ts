import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersService } from '@shared/services/users.service';
import { TrackMolaState } from '@store/trackMola.state';
import { map, switchMap, take } from 'rxjs';
import { getUserInfo, getUserInfoSuccess } from './profile.actions';

@Injectable()
export class ProfileEffects {
  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserInfo),
      switchMap(() =>
        this.usersService.currentUserProfile$.pipe(
          take(1),
          map((profileUser) => getUserInfoSuccess({ profileUser }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store$: Store<TrackMolaState>
  ) { }
}

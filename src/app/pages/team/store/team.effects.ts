import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs';

import { updateUser } from './team.actions';

import { UsersService } from '@shared/services/users.service';

@Injectable()
export class TeamEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ user }) => this.usersService.editUser(user))
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}

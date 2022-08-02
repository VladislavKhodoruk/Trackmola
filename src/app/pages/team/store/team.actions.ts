import { createAction, props } from '@ngrx/store';

import { User } from '@shared/interfaces/interfaces';

export const SET_USER = 'set user';
export const setUser = createAction(SET_USER, props<{ user: User }>());

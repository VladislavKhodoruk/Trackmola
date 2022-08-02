import { createAction, props } from '@ngrx/store';

import { User } from '@shared/interfaces/interfaces';

export const SET_USER = '[team page] set user';
export const setUser = createAction(SET_USER, props<{ user: User }>());

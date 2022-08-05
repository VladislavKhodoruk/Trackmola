import { createAction, props } from '@ngrx/store';

import { User } from '@shared/interfaces/interfaces';

export const SET_USER = '[team page] set user';
export const UPDATE_USER = '[team page] update user';

export const setUser = createAction(SET_USER, props<{ user: User }>());

export const updateUser = createAction(UPDATE_USER, props<{ user: User }>());

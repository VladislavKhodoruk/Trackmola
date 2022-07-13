import { createAction, props } from '@ngrx/store';

import { User } from '@shared/interfaces/interfaces';

export const GET_USER_INFO = '[Profile page] get user info';
export const GET_USER_INFO_SUCCESS = '[Profile page] get user info success';

export const getUserInfo = createAction(GET_USER_INFO);

export const getUserInfoSuccess = createAction(
  GET_USER_INFO_SUCCESS,
  props<{ profileUser: User }>()
);

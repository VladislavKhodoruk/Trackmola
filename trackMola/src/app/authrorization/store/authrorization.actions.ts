import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'src/app/common/interfaces';
import { User } from 'src/app/common/models';

export const LOGIN_START = 'login start';
export const LOGIN_SUCCESS = 'login success';
export const LOGIN_FAIL = 'login fail';
export const GET_TYPE = 'get type';
export const LOGOUT = 'logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; userInfo: UserInfo }>()
);

export const getType = createAction(GET_TYPE, props<{ user: User }>());

export const logout = createAction(LOGOUT);

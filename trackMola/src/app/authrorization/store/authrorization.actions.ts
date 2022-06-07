import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/common/models';

export const LOGIN_START = 'login start';
export const LOGIN_SUCCESS = 'login success';
export const LOGIN_FAIL = 'login fail';
export const LOGOUT = 'logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User | null }>()
);

export const logout = createAction(LOGOUT);

import { createAction, props } from '@ngrx/store';

export const LOGIN_START = 'login start';
export const LOGIN_SUCCESS = 'login success';

export const LOGOUT = 'logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(LOGIN_SUCCESS);

export const logout = createAction(LOGOUT);

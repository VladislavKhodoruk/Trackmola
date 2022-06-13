import { createAction, props } from '@ngrx/store';

export const LOGIN_START = 'login start';
export const LOGIN_SUCCESS = 'login success';
export const GET_USER_TYPE = 'get user type';

export const LOGOUT = 'logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const getUserType = createAction(GET_USER_TYPE);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ userType?: string | null }>()
);

export const logout = createAction(LOGOUT);

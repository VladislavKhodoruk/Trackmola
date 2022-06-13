import { createAction, props } from '@ngrx/store';
import { ProfileUser } from 'src/app/shared/interfaces/interfaces';
export const GET_USER_DATA = 'get user data';
export const GET_USER_DATA_SUCCESS = 'get user success';

export const getUserData = createAction(GET_USER_DATA);
export const getUserDataSuccess = createAction(
  GET_USER_DATA_SUCCESS,
  props<{ data: ProfileUser }>()
);

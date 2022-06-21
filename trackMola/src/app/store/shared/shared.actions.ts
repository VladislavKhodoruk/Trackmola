import { createAction, props } from '@ngrx/store';
import { ProfileUser } from 'src/app/shared/interfaces/interfaces';
import { TaskTrack } from './shared.state';

export const LOADING = 'loading';
export const ERROR_MESSGE = 'error message';
export const GET_USER_DATA = 'get user data';
export const GET_USER_DATA_SUCCESS = 'get user success';
export const CHANGE_DATE = 'change date';
export const GET_ALL_TASKS = 'get all tasks';
export const GET_ALL_TASKS_SUCCESS = 'get all tasks success';

export const loading = createAction(LOADING, props<{ status: boolean }>());
export const errorMessage = createAction(
  ERROR_MESSGE,
  props<{ message: string; loaded: boolean }>()
);

export const getUserData = createAction(GET_USER_DATA);
export const getUserDataSuccess = createAction(
  GET_USER_DATA_SUCCESS,
  props<{ data: ProfileUser }>()
);

export const changeDate = createAction(CHANGE_DATE, props<{ date: Date }>());
export const getAllTasks = createAction(GET_ALL_TASKS);

export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ tasks: TaskTrack[] }>()
);

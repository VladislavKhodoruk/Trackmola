import { createAction, props } from '@ngrx/store';
import {
  FirstAndLastDayOfWeek,
  ProfileUser,
} from '@shared/interfaces/interfaces';

import { TaskTrack } from './shared.state';

export const LOADING = 'loading';
export const ERROR_MESSGE = 'error message';
export const GET_USER_DATA = 'get user data';
export const GET_USER_DATA_SUCCESS = 'get user success';
export const CHANGE_DATE = 'change date';
export const GET_ALL_TASKS_TRACK = 'get all tasks track';
export const GET_ALL_TASKS_TRACK_SUCCESS = 'get all tasks track success';
export const GET_ALL_TASKS_UPDATE = 'get all tasks update';
export const SET_FIRST_AND_LAST_DAY_WEEK = 'set first and last day of week';
export const NEXT_WEEK = 'next week';
export const PREVIOUS_WEEK = 'previous week';

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

export const setFirstAndLastDayOfWeek = createAction(
  SET_FIRST_AND_LAST_DAY_WEEK,
  props<{ firstAndLastDayOfWeek: FirstAndLastDayOfWeek }>()
);

export const nextWeek = createAction(NEXT_WEEK, props<{ value: number }>());
export const previousWeek = createAction(
  PREVIOUS_WEEK,
  props<{ value: number }>()
);

export const getAllTasksTrack = createAction(GET_ALL_TASKS_TRACK);

export const getAllTasksTrackSuccess = createAction(
  GET_ALL_TASKS_TRACK_SUCCESS,
  props<{ tasksTrack: TaskTrack[] }>()
);

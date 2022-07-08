import { createAction, props } from '@ngrx/store';
import {
  Period,
  Project,
  User,
  Task,
  TaskTrack,
} from '@shared/interfaces/interfaces';

export const LOADING = 'loading';
export const ERROR_MESSAGE = 'error message';
export const GET_USER_DATA = 'get user data';
export const GET_USER_DATA_SUCCESS = 'get user success';
export const CHANGE_DATE = 'change date';
export const GET_ALL_TASK_TRACKS = 'get all task tracks';
export const GET_ALL_TASK_TRACKS_SUCCESS = 'get all task tracks success';
export const GET_ALL_TASKS = 'get all tasks';
export const GET_ALL_TASKS_SUCCESS = 'get all tasks success';
export const GET_ALL_PROJECTS = 'get all projects';
export const GET_ALL_PROJECTS_SUCCESS = 'get all projects success';
export const GET_ALL_USERS = 'get all users';
export const GET_ALL_USERS_SUCCESS = 'get all users success';
export const GET_ALL_TASKS_UPDATE = 'get all tasks update';
export const SET_PERIOD = 'set period';
export const NEXT_WEEK = 'next week';
export const PREVIOUS_WEEK = 'previous week';

export const loading = createAction(LOADING, props<{ status: boolean }>());
export const errorMessage = createAction(
  ERROR_MESSAGE,
  props<{ message: string; loaded: boolean }>()
);

export const getUserData = createAction(GET_USER_DATA);
export const getUserDataSuccess = createAction(
  GET_USER_DATA_SUCCESS,
  props<{ profileUser: User }>()
);

export const changeDate = createAction(CHANGE_DATE, props<{ date: number }>());

export const setPeriod = createAction(SET_PERIOD, props<{ period: Period }>());

export const nextWeek = createAction(NEXT_WEEK, props<{ value: number }>());
export const previousWeek = createAction(
  PREVIOUS_WEEK,
  props<{ value: number }>()
);

export const getAllTaskTracks = createAction(GET_ALL_TASK_TRACKS);

export const getAllTaskTracksSuccess = createAction(
  GET_ALL_TASK_TRACKS_SUCCESS,
  props<{ taskTracks: TaskTrack[] }>()
);

export const getAllTasks = createAction(GET_ALL_TASKS);

export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const getAllProjects = createAction(GET_ALL_PROJECTS);

export const getAllProjectsSuccess = createAction(
  GET_ALL_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

export const getAllUsers = createAction(GET_ALL_USERS);

export const getAllUsersSuccess = createAction(
  GET_ALL_USERS_SUCCESS,
  props<{ users: User[] }>()
);

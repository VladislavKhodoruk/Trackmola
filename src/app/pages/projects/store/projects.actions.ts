import { createAction, props } from '@ngrx/store';
import {
  Period,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

export const GET_ALL_TASKS = 'get all tasks';
export const GET_ALL_TASKS_SUCCESS = 'get all tasks success';

export const GET_PROJECTS = 'get projects';
export const GET_PROJECTS_SUCCESS = 'get projects success';

export const GET_ACTIVE_TASKS_IN_PROJECT = 'get active tasks in project';
export const GET_ACTIVE_TASKS_IN_PROJECT_SUCCESS =
  'get active tasks in project success';

export const GET_ALL_USERS = 'get users';
export const GET_ALL_USERS_SUCCESS = 'get users success';

export const SET_SELECTED_PROJECT = 'set selected project';
export const DELETE_SELECTED_PROJECT = 'delete selected project';

export const SET_SEARCH_VALUE = 'set search value';

export const CLEAR_PROJECT_STORE = 'clear project store';

export const getAllTasks = createAction(
  GET_ALL_TASKS,
  props<{ period: Period }>()
);

export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ tasks: TaskTrack[] }>()
);

export const getProjects = createAction(GET_PROJECTS);

export const getProjectsSuccess = createAction(
  GET_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

export const getAllUsers = createAction(GET_ALL_USERS);

export const getAllUsersSuccess = createAction(
  GET_ALL_USERS_SUCCESS,
  props<{ usersInfo: User[] }>()
);

export const setSelectedProject = createAction(
  SET_SELECTED_PROJECT,
  props<{ project: Project }>()
);

export const deleteSelectedProject = createAction(DELETE_SELECTED_PROJECT);

export const setSearchValue = createAction(
  SET_SEARCH_VALUE,
  props<{ value: string }>()
);

export const clearProjectStore = createAction(CLEAR_PROJECT_STORE);

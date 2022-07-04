import { createAction, props } from '@ngrx/store';
import {
  Period,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

export const GET_ALL_TASKS = '[Projects Page] get all tasks';
export const GET_ALL_TASKS_SUCCESS = '[Projects Page] get all tasks success';

export const GET_ALL_PROJECTS = '[Projects Page] get all projects';
export const GET_ALL_PROJECTS_SUCCESS =
  '[Projects Page] get all projects success';

export const GET_ALL_USERS = '[Projects Page] get users';
export const GET_ALL_USERS_SUCCESS = '[Projects Page] get users success';

export const SET_SELECTED_PROJECT = '[Projects Page] set selected project';
export const DELETE_SELECTED_PROJECT =
  '[Projects Page] delete selected project';

export const SET_SEARCH_VALUE = '[Projects Page] set search value';

export const CLEAR_PROJECT_STORE = '[Projects Page] clear project store';

export const getAllTasks = createAction(
  GET_ALL_TASKS,
  props<{ period: Period }>()
);

export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ tasks: TaskTrack[] }>()
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

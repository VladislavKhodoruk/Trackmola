import { createAction, props } from '@ngrx/store';
import {
  Project,
  UserProfileInProject,
  Task,
} from '@pages/projects/interfaces/interfaces';

export const GET_PROJECTS = 'get projects';
export const GET_PROJECTS_SUCCESS = 'get projects success';
export const DELETE_PROJECT = 'delete project';
export const GET_TASKS_IN_PROJECT = 'get tasks in project';
export const GET_TASKS_IN_PROJECT_SUCCESS = 'get tasks in project success';
export const GET_USERS_PROFILE_IN_PROJECT = 'get users profile in project';
export const GET_USERS_PROFILE_IN_PROJECT_SUCCESS =
  'get users profile in project success';
export const SET_SELECTED_PROJECT = 'set selected project';
export const DELETE_SELECTED_PROJECT = 'delete selected project';
export const SET_SEARCH_VALUE = 'set search value';
export const CLEAR_PROJECT_STORE = 'clear project store';

export const getProjects = createAction(GET_PROJECTS);
export const getProjectsSuccess = createAction(
  GET_PROJECTS_SUCCESS,
  props<{ data: Project[] }>()
);

export const deleteProject = createAction(
  DELETE_PROJECT,
  props<{ id: string }>()
);

export const getTasksInProject = createAction(
  GET_TASKS_IN_PROJECT,
  props<{ id: string }>()
);

export const getTasksInProjectSuccess = createAction(
  GET_TASKS_IN_PROJECT_SUCCESS,
  props<{ data: Task[] }>()
);

export const getUsersProfileInProject = createAction(
  GET_USERS_PROFILE_IN_PROJECT,
  props<{ id: string; team: string[] }>()
);

export const getUsersProfileInProjectSuccess = createAction(
  GET_USERS_PROFILE_IN_PROJECT_SUCCESS,
  props<{ usersProfiles: UserProfileInProject[] }>()
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

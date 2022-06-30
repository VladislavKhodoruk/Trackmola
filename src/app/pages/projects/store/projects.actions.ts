import { createAction, props } from '@ngrx/store';
import {
  Project,
  UserProfileInProject,
  Task,
  TaskTrack,
} from '@pages/projects/interfaces/interfaces';

export const GET_TASKS = 'get tasks';
export const GET_TASKS_SUCCESS = 'get tasks success';
export const GET_PROJECTS = 'get projects';
export const GET_PROJECTS_SUCCESS = 'get projects success';

export const DELETE_PROJECT = 'delete project';

export const SET_SELECTED_PROJECT = 'set selected project';
export const DELETE_SELECTED_PROJECT = 'delete selected project';
export const SET_SEARCH_VALUE = 'set search value';
export const CLEAR_PROJECT_STORE = 'clear project store';

export const getTasks = createAction(GET_TASKS);

export const getTasksSuccess = createAction(
  GET_TASKS_SUCCESS,
  props<{ tasks: TaskTrack[] }>()
);

export const getProjects = createAction(
  GET_PROJECTS,
  props<{ tasks: TaskTrack[] }>()
);

export const getProjectsSuccess = createAction(
  GET_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

export const deleteProject = createAction(
  DELETE_PROJECT,
  props<{ id: string }>()
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

import { createAction, props } from '@ngrx/store';
import { Project } from '../interfaces/interfaces';
import { Task } from '../interfaces/interfaces';

export const GET_PROJECTS = 'get projects';
export const GET_PROJECTS_SUCCESS = 'get projects success';
export const GET_TASKS_IN_PROJECT = 'get tasks in project';
export const GET_TASKS_IN_PROJECT_SUCCESS = 'get tasks in project success';
export const CLEAR_PROJECT_STORE = 'clear project store';

export const getProjects = createAction(GET_PROJECTS);
export const getProjectsSuccess = createAction(
  GET_PROJECTS_SUCCESS,
  props<{ data: Project[] }>()
);
export const getTasksInProject = createAction(
  GET_TASKS_IN_PROJECT,
  props<{ id: string }>()
);
export const getTasksInProjectSuccess = createAction(
  GET_TASKS_IN_PROJECT_SUCCESS,
  props<{ data: Task[] }>()
);

export const clearProjectStore = createAction(CLEAR_PROJECT_STORE);

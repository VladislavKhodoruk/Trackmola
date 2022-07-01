import { createAction, props } from '@ngrx/store';
import { Project } from '@pages/projects/interfaces/interfaces';
import { Task } from '@pages/report/interfaces/interfaces';

export const GET_ALL_TASKS_DATA = 'get all tasks data';
export const GET_ALL_TASKS_DATA_SUCCESS = 'get all tasks data success';

export const GET_ALL_PROJECTS = 'get all projects';
export const GET_ALL_PROJECTS_SUCCESS = 'get all projects success';

export const getAllTasks = createAction(GET_ALL_TASKS_DATA);

export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_DATA_SUCCESS,
  props<{ allTasks: Task[] }>()
);

export const getAllProjects = createAction(GET_ALL_PROJECTS);

export const getAllProjectsSuccess = createAction(
  GET_ALL_PROJECTS_SUCCESS,
  props<{ allProjects: Project[] }>()
);

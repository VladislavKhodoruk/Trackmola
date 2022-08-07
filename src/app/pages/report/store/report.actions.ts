import { createAction, props } from '@ngrx/store';

import { Project, TaskTrack, Task } from '@shared/interfaces/interfaces';

export const GET_ALL_TASKS_DATA = 'get all tasks data';
export const GET_ALL_TASKS_DATA_SUCCESS = 'get all tasks data success';

export const GET_ALL_PROJECTS = 'get all projects';
export const GET_ALL_PROJECTS_SUCCESS = 'get all projects success';

export const SET_TASK = '[Projects Page] set task';

export const PUT_TASKTRACK = 'put tasktrack';

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

export const putTaskTrack = createAction(
  PUT_TASKTRACK,
  props<{ taskTrack: TaskTrack }>()
);

export const addTask = createAction(SET_TASK, props<{ task: Task }>());

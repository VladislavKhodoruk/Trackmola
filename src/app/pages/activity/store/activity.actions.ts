import { createAction, props } from '@ngrx/store';
import { Project, Task } from '@pages/projects/interfaces/interfaces';

export const GET_ACTIVITY_TASKS = 'get tasks for activity';
export const GET_ACTIVITY_TASKS_SUCCESS = 'get tasks for activity success';
export const GET_ACTIVITY_PROJECTS = 'get projects for activity';
export const GET_ACTIVITY_PROJECTS_SUCCESS =
  'get projects for activity success';

export const getActivityTasks = createAction(
  GET_ACTIVITY_TASKS,
  props<{ start: number; end: number }>()
);
export const getActivityTasksSuccess = createAction(
  GET_ACTIVITY_TASKS_SUCCESS,
  props<{ data: Task[] }>()
);
export const getActivityProjects = createAction(
  GET_ACTIVITY_PROJECTS,
  props<{ data: Task[] }>()
);

export const getActivityProjectsSuccess = createAction(
  GET_ACTIVITY_PROJECTS_SUCCESS,
  props<{ data: Project[] }>()
);

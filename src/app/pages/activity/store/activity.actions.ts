import { createAction, props } from '@ngrx/store';
import { Task, Project, Period } from '@shared/interfaces/interfaces';

export const GET_ACTIVITY_TASKS = '[Activity page] get tasks for activity';
export const GET_ACTIVITY_TASKS_SUCCESS =
  '[Activity page] get tasks for activity success';
export const GET_ACTIVITY_PROJECTS =
  '[Activity page] get projects for activity';
export const GET_ACTIVITY_PROJECTS_SUCCESS =
  '[Activity page] get projects for activity success';

export const getActivityTasks = createAction(
  GET_ACTIVITY_TASKS,
  props<{ period: Period }>()
);

export const getActivityTasksSuccess = createAction(
  GET_ACTIVITY_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const getActivityProjects = createAction(
  GET_ACTIVITY_PROJECTS,
  props<{ tasks: Task[] }>()
);

export const getActivityProjectsSuccess = createAction(
  GET_ACTIVITY_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

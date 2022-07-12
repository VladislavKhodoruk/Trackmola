import { createAction, props } from '@ngrx/store';
import { Project, Period, TaskTrack } from '@shared/interfaces/interfaces';

export const GET_ACTIVITY_TASKS = '[Activity page] get tasks for activity';
export const GET_ACTIVITY_TASKS_SUCCESS =
  '[Activity page] get tasks for activity success';
export const GET_ACTIVITY_PROJECTS =
  '[Activity page] get projects for activity';
export const GET_ACTIVITY_PROJECTS_SUCCESS =
  '[Activity page] get projects for activity success';
export const GET_WEEK_REPORT_TIME = '[Activity page] get week report time';
export const GET_WWEK_REPORT_TIME_SUCCUSS =
  '[Activity page] get week report time success';
export const CHANGE_PERIOD_ACTIVITY =
  '[Activity page] choose activity activity';
export const CHANGE_PERIOD_ACTIVITY_SUCCESS =
  ' [Activity page] choose activity activity success';

export const getActivityTasks = createAction(
  GET_ACTIVITY_TASKS,
  props<{ period: Period }>()
);

export const getActivityTasksSuccess = createAction(
  GET_ACTIVITY_TASKS_SUCCESS,
  props<{ tasks: TaskTrack[] }>()
);

export const getActivityProjects = createAction(
  GET_ACTIVITY_PROJECTS,
  props<{ tasks: TaskTrack[] }>()
);

export const getActivityProjectsSuccess = createAction(
  GET_ACTIVITY_PROJECTS_SUCCESS,
  props<{ projects: Project[] }>()
);

export const getWeekReportTime = createAction(GET_WEEK_REPORT_TIME);

export const getWeekReportTimeSuccess = createAction(
  GET_WWEK_REPORT_TIME_SUCCUSS,
  props<{ weekReportTime: number }>()
);

export const changeActivityPeriod = createAction(CHANGE_PERIOD_ACTIVITY);

export const changeActivityPeriodSuccess = createAction(
  CHANGE_PERIOD_ACTIVITY_SUCCESS,
  props<{ choosePeriod: string }>()
);

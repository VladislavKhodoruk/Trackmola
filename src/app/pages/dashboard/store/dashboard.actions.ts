import { createAction, props } from '@ngrx/store';

import { ManagerDashboardView } from '../enums/enum';

import { TaskForManager } from '../interfaces/interface';

import { UserType } from '@shared/enums/enum';
import { Period, Project } from '@shared/interfaces/interfaces';

export const GET_WEEK_REPORT_TIME = '[Dashboard page] get week report time';
export const GET_WEEK_REPORT_TIME_SUCCESS =
  '[Dashboard page] get week report time success';

export const SET_PROJECT_FILTER = '[Dashboard page] set project filter';
export const REMOVE_PROJECT_FILTER = '[Dashboard page] remove project filter';

export const SET_ACTIVE_PROJECT_FILTER =
  '[Dashboard page] set active project filter';
export const REMOVE_ACTIVE_PROJECT = '[Dashboard page] remove active project';

export const CHANGE_MANAGER_MAIN_VIEW =
  '[Dashboard page] change manager main view';

export const SET_ACTIVE_TASK = '[Dashboard page] set active task';

export const GET_DASHBOARD_MODE_VIEW =
  '[Dashboard page] get dashboard mode view';

export const CHANGE_DASHBOARD_VIEW = '[Dashboard page] change dashboard view';

export const CLEAR_DASHBOARD_STATE = '[Dashboard page] clear dashboard state';

export const CHANGE_MANAGER_PERIOD = '[Dashboard page] change manager period';

export const getWeekReportTime = createAction(GET_WEEK_REPORT_TIME);

export const getWeekReportTimeSuccess = createAction(
  GET_WEEK_REPORT_TIME_SUCCESS,
  props<{ weekReportTime: number }>()
);

export const setProjectFilter = createAction(
  SET_PROJECT_FILTER,
  props<{ projectName: Project['name'] }>()
);

export const removeProjectFilter = createAction(
  REMOVE_PROJECT_FILTER,
  props<{ project: Project }>()
);

export const setActiveProjectFilter = createAction(
  SET_ACTIVE_PROJECT_FILTER,
  props<{ activeProject: Project }>()
);

export const removeActiveProject = createAction(REMOVE_ACTIVE_PROJECT);

export const changeManagerMainView = createAction(
  CHANGE_MANAGER_MAIN_VIEW,
  props<{ mode: ManagerDashboardView }>()
);

export const setActiveTask = createAction(
  SET_ACTIVE_TASK,
  props<{ task: TaskForManager }>()
);

export const changeDashboardView = createAction(
  CHANGE_DASHBOARD_VIEW,
  props<{ dashboardView: UserType }>()
);

export const changeManagerPeriod = createAction(
  CHANGE_MANAGER_PERIOD,
  props<{ period: Period }>()
);

export const clearDashboardState = createAction(CLEAR_DASHBOARD_STATE);

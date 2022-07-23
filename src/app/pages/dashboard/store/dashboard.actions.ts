import { createAction, props } from '@ngrx/store';

import { Project } from '@shared/interfaces/interfaces';
import { ManagerDashboardView } from '../enums/enum';

export const GET_WEEK_REPORT_TIME = '[Dashboard page] get week report time';
export const GET_WEEK_REPORT_TIME_SUCCESS =
  '[Dashboard page] get week report time success';

export const SET_PROJECT_FILTER = '[Dashboard page] set project filter';
export const REMOVE_PROJECT_FILTER = '[Dashboard page] remove project filter';

export const CHANGE_MANAGER_MAIN_VIEW =
  '[Dashboard page] change manager main view';

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
  props<{ projectName: Project['name'] }>()
);

export const changeManagerMainView = createAction(
  CHANGE_MANAGER_MAIN_VIEW,
  props<{ mode: ManagerDashboardView }>()
);

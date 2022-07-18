import { createAction, props } from '@ngrx/store';

import { PeriodType } from '@shared/enums/enum';

export const GET_WEEK_REPORT_TIME = '[Activity page] get week report time';
export const GET_WEEK_REPORT_TIME_SUCCUSS =
  '[Activity page] get week report time success';
export const CHANGE_PERIOD_ACTIVITY =
  '[Activity page] choose activity activity';
export const CHANGE_PERIOD_ACTIVITY_SUCCESS =
  ' [Activity page] choose activity activity success';

export const getWeekReportTime = createAction(GET_WEEK_REPORT_TIME);

export const getWeekReportTimeSuccess = createAction(
  GET_WEEK_REPORT_TIME_SUCCUSS,
  props<{ weekReportTime: number }>()
);

export const changeActivityPeriod = createAction(CHANGE_PERIOD_ACTIVITY);

export const changeActivityPeriodSuccess = createAction(
  CHANGE_PERIOD_ACTIVITY_SUCCESS,
  props<{ choosePeriod: PeriodType }>()
);

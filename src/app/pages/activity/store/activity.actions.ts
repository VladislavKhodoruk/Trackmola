import { createAction, props } from '@ngrx/store';

export const GET_WEEK_REPORT_TIME = '[Activity page] get week report time';
export const GET_WWEK_REPORT_TIME_SUCCUSS =
  '[Activity page] get week report time success';

export const getWeekReportTime = createAction(GET_WEEK_REPORT_TIME);

export const getWeekReportTimeSuccess = createAction(
  GET_WWEK_REPORT_TIME_SUCCUSS,
  props<{ weekReportTime: number }>()
);

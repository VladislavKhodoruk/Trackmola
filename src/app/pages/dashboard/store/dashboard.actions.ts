import { createAction, props } from '@ngrx/store';

export const GET_WEEK_REPORT_TIME = '[Dashboard page] get week report time';
export const GET_WEEK_REPORT_TIME_SUCCESS =
  '[Dashboard page] get week report time success';

export const getWeekReportTime = createAction(GET_WEEK_REPORT_TIME);

export const getWeekReportTimeSuccess = createAction(
  GET_WEEK_REPORT_TIME_SUCCESS,
  props<{ weekReportTime: number }>()
);

// 3 экшена
// 4-й экшен init page

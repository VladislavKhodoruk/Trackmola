import { Action, createReducer, on } from '@ngrx/store';
import {
  getWeekReportTimeSuccess,
  changeActivityPeriodSuccess,
} from './activity.actions';
import { ActivityState, activityState } from './activity.state';

const activityReducer = createReducer(
  activityState,
  on(getWeekReportTimeSuccess, (state: ActivityState, { weekReportTime }) => ({
    ...state,
    weekReportTime,
  })),
  on(changeActivityPeriodSuccess, (state: ActivityState, { choosePeriod }) => ({
    ...state,
    choosePeriod,
  }))
);

export function ActivityReducer(state: ActivityState, action: Action) {
  return activityReducer(state, action);
}

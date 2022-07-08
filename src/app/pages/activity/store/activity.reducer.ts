import { Action, createReducer, on } from '@ngrx/store';
import { getWeekReportTimeSuccess } from './activity.actions';
import { ActivityState, activityState } from './activity.state';

const activityReducer = createReducer(
  activityState,
  on(getWeekReportTimeSuccess, (state: ActivityState, { weekReportTime }) => ({
    ...state,
    weekReportTime,
  }))
);

export function ActivityReducer(state: ActivityState, action: Action) {
  return activityReducer(state, action);
}

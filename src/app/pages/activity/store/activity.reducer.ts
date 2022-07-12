import { Action, createReducer, on } from '@ngrx/store';
import {
  getWeekReportTimeSuccess,
  getActivityProjectsSuccess,
  getActivityTasksSuccess,
  changeActivityPeriodSuccess,
} from './activity.actions';
import { ActivityState, activityState } from './activity.state';

const activityReducer = createReducer(
  activityState,
  on(getActivityTasksSuccess, (state: ActivityState, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(getActivityProjectsSuccess, (state: ActivityState, { projects }) => ({
    ...state,
    projects,
  })),
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

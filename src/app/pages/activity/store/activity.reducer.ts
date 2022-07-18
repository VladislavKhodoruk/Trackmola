import { Action, createReducer, on } from '@ngrx/store';

import {
  getWeekReportTimeSuccess,
  changeActivityPeriodSuccess,
} from './activity.actions';

import { ActivityState, activityState } from './activity.state';

import { getPeriod } from '@shared/helpers/helpers';

const activityReducer = createReducer(
  activityState,
  on(getWeekReportTimeSuccess, (state: ActivityState, { weekReportTime }) => ({
    ...state,
    weekReportTime,
  })),
  on(changeActivityPeriodSuccess, (state: ActivityState, { choosePeriod }) => ({
    ...state,
    choosePeriod,
    period: getPeriod(new Date(), choosePeriod),
  }))
);

export function ActivityReducer(state: ActivityState, action: Action) {
  return activityReducer(state, action);
}

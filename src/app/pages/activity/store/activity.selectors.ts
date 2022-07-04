import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { ActivityState } from './activity.state';

export const ACTIVITY_STATE_NAME = StateName.Activity;

const getActivityState =
  createFeatureSelector<ActivityState>(ACTIVITY_STATE_NAME);

export const getWeekReportTime = createSelector(
  getActivityState,
  ({ weekReportTime }) => weekReportTime
);

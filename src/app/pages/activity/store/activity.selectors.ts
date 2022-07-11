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

export const getActivityPeriod = createSelector(
  getActivityState,
  ({ period }) => period
);

export const getActivityTasks = createSelector(
  getActivityState,
  ({ tasks }) => tasks
);

export const getActivityProjects = createSelector(
  getActivityState,
  ({ projects }) => projects
);

export const getActivePeriod = createSelector(
  getActivityState,
  ({ choosePeriod }) => choosePeriod
);

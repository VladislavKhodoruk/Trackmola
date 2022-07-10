import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { allTasksTrack } from '@store/common/common.selectors';
import { ActivityState } from './activity.state';

export const ACTIVITY_STATE_NAME = StateName.Activity;

const getActivityState =
  createFeatureSelector<ActivityState>(ACTIVITY_STATE_NAME);

export const getActivityPeriod = createSelector(
  getActivityState,
  ({ period }) => period
);

export const getWeekReportTime = createSelector(
  allTasksTrack,
  getActivityPeriod,
  (taskTracks, period) =>
    taskTracks
      .filter(
        (taskTrack) =>
          taskTrack.date.seconds * 1000 > period.start &&
          taskTrack.date.seconds * 1000 < period.end
      )
      .reduce((result, item) => (result += item.duration), 0)
);

export const getActivityTasks = createSelector(
  getActivityState,
  ({ tasks }) => tasks
);

export const getActivityProjects = createSelector(
  getActivityState,
  ({ projects }) => projects
);

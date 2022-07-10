import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { DashboardState } from './dashboard.state';
import { getTasksTrack } from '@store/common/common.selectors';

export const DASHBOARD_STATE_NAME = StateName.Dashboard;

const getDashboardState =
  createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);

export const getDashboardPeriod = createSelector(
  getDashboardState,
  ({ period }) => period
);

export const getWeekReportTime = createSelector(
  getTasksTrack,
  getDashboardPeriod,
  (taskTracks, period) =>
    taskTracks
      .filter(
        (taskTrack) =>
          taskTrack.userId === localStorage.getItem('AuthUserId') &&
          taskTrack.date.seconds * 1000 > period.start &&
          taskTrack.date.seconds * 1000 < period.end
      )
      .reduce((result, item) => (result += item.duration), 0)
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { CommonState } from './common.state';

const getCommonState = createFeatureSelector<CommonState>(StateName.Common);

export const getLoading = createSelector(
  getCommonState,
  (state) => state.loadingStatus.loading
);

export const getErrorMessage = createSelector(
  getCommonState,
  (state) => state.loadingStatus.errorMessage
);

export const getPeriod = createSelector(
  getCommonState,
  (state) => state.period
);

export const getUser = createSelector(getCommonState, (state) => state.user);

export const getFirstDay = createSelector(getPeriod, (period) => period.start);

export const getLastDay = createSelector(getPeriod, (period) => period.end);

export const getDate = createSelector(getCommonState, (state) => state.date);

export const getTasksTrack = createSelector(
  getCommonState,
  ({ taskTracks }) => taskTracks
);

export const getTasks = createSelector(getCommonState, ({ tasks }) => tasks);

export const getProjects = createSelector(
  getCommonState,
  ({ projects }) => projects
);

export const getTasksTrackByPeriod = createSelector(
  getTasksTrack,
  getPeriod,
  (taskTracks, period) =>
    taskTracks.filter(
      (taskTrack) =>
        taskTrack.userId === localStorage.getItem('AuthUserId') &&
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

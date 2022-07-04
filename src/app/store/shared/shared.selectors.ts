import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_NAME);

export const getLoading = createSelector(
  getSharedState,
  (state) => state.loadingStatus.loading
);

export const getErrorMessage = createSelector(
  getSharedState,
  (state) => state.loadingStatus.errorMessage
);

export const getPeriod = createSelector(
  getSharedState,
  (state) => state.period
);

export const getFirstDay = createSelector(getPeriod, (period) => period.start);

export const getLastDay = createSelector(getPeriod, (period) => period.end);

export const getDate = createSelector(getSharedState, (state) => state.date);

export const allTasksTrack = createSelector(
  getSharedState,
  (state) => state.tasksTrack
);

export const inProgressTasks = createSelector(allTasksTrack, (state) =>
  state.filter((i) => i.status === 'in progress' || i.status === '')
);

// export const getProjects = createSelector(
//   getSharedState,
//   (state) => state.projects
// );

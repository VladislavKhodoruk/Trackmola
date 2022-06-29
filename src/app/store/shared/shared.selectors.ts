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

export const getFirstAndLastDay = createSelector(
  getSharedState,
  (state) => state.firstAndLastDay
);

export const getFirstDayOfWeek = createSelector(
  getFirstAndLastDay,
  (firstAndLastDay) => firstAndLastDay.start
);

export const getLastDayOfWeek = createSelector(
  getFirstAndLastDay,
  (firstAndLastDay) => firstAndLastDay.end
);

export const getDate = createSelector(getSharedState, (state) => state.date);

export const allTasks = createSelector(getSharedState, (state) => state.tasks);

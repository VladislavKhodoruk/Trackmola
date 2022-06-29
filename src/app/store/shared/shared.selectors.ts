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

export const getFirstAndLastDayOfWeek = createSelector(
  getSharedState,
  (state) => state.firstAndLastDayOfWeek
);

export const getFirstDayOfWeek = createSelector(
  getFirstAndLastDayOfWeek,
  (firstAndLastDayOfWeek) => firstAndLastDayOfWeek.firstDay
);

export const getLastDayOfWeek = createSelector(
  getFirstAndLastDayOfWeek,
  (firstAndLastDayOfWeek) => firstAndLastDayOfWeek.lastDay
);

export const getDate = createSelector(getSharedState, (state) => state.date);

export const allTasks = createSelector(getSharedState, (state) => state.tasks);


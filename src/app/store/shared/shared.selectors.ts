import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
import { ProfileUser } from '@shared/interfaces/interfaces';

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

export const getUserPhoto = createSelector(getSharedState, (state) => {
  if (state && state.user) {
    const usetInfo: ProfileUser = state.user;
    return usetInfo.photo;
  }

  return '';
});

export const getUserType = createSelector(getSharedState, (state) => {
  if (state && state.user) {
    const usetInfo: ProfileUser = state.user;
    return usetInfo.type;
  }
  return '';
});

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

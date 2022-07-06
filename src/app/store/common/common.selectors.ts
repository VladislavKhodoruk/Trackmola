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

export const getUser = createSelector(getSharedState, (state) => state.user);

export const getUserPhoto = createSelector(
  getUser,
  (user) => user?.photo || ''
);
export const getUserType = createSelector(getUser, (user) => user?.type || '');

export const getFirstDay = createSelector(getPeriod, (period) => period.start);

export const getLastDay = createSelector(getPeriod, (period) => period.end);

export const getDate = createSelector(getCommonState, (state) => state.date);

export const allTasksTrack = createSelector(
  getCommonState,
  (state) => state.tasksTrack
);

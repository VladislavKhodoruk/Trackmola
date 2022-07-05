import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { SharedState } from './shared.state';

const getSharedState = createFeatureSelector<SharedState>(StateName.Shared);

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

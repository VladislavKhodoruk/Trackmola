import { CommonState } from './common.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const COMMON_NAME = 'common';

const getCommonState = createFeatureSelector<CommonState>(COMMON_NAME);

export const getLoading = createSelector(
  getCommonState,
  (state) => state.loading
);

export const getErrorMessage = createSelector(
  getCommonState,
  (state) => state.errorMessage
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserType } from '@shared/enums/enum';
import {
  navigationBasicItems,
  navigationTeam,
} from '@shared/constants/constants';
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

export const getNavigationElems = createSelector(getSharedState, (state) => {
  switch (state.user.type) {
    case UserType.Employee:
      return navigationBasicItems;
    case UserType.CTO:
      return [...navigationBasicItems, ...navigationTeam];
    case UserType.Manager:
      return [...navigationBasicItems, ...navigationTeam];
    case UserType.Admin:
      return [...navigationBasicItems, ...navigationTeam];
  }
});

export const getUserPhoto = createSelector(
  getSharedState,
  (state) => state.user.photo
);

export const getUserType = createSelector(
  getSharedState,
  (state) => state.user.type
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

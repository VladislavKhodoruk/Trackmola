import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserType } from 'src/app/shared/enums/enum';
import {
  FirstAndLastDayOfWeek,
  ProfileUser,
} from 'src/app/shared/interfaces/interfaces';
import {
  navigationBasicItems,
  navigationTeam,
} from 'src/app/shared/constants/constants';
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
  if (state && state.user) {
    const usetInfo: ProfileUser = state.user;
    switch (usetInfo.type) {
      case UserType.Employee:
        return navigationBasicItems;
      case UserType.CTO:
        return [...navigationBasicItems, ...navigationTeam];
      case UserType.Manager:
        return [...navigationBasicItems, ...navigationTeam];
      case UserType.Admin:
        return [...navigationBasicItems, ...navigationTeam];
    }
  }
  return null;
});

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
  (state) => state.firstAndLastDayOfWeek as FirstAndLastDayOfWeek
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

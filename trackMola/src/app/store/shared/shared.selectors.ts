import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserType } from 'src/app/shared/enums/enum';
import {
  FirstAndLastDayOfWeek,
  ProfileUser,
} from 'src/app/shared/interfaces/interfaces';
import { navigationItems } from 'src/app/shared/constants/constants';
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
        return navigationItems;
      case UserType.CTO:
        return navigationItems;
      case UserType.Manager:
        return navigationItems;
      case UserType.Admin:
        return navigationItems;
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


export const getFirstDayOfWeek = createSelector(getSharedState, (state) => {
  if (state && state.firstAndLastDayOfWeek) {
    const firstAndLastDayOfWeek: FirstAndLastDayOfWeek =
      state.firstAndLastDayOfWeek;
    return firstAndLastDayOfWeek['firstDay'];
  }
  return null;
});

export const getLastDayOfWeek = createSelector(getSharedState, (state) => {
  if (state && state.firstAndLastDayOfWeek) {
    const firstAndLastDayOfWeek: FirstAndLastDayOfWeek =
      state.firstAndLastDayOfWeek;
    return firstAndLastDayOfWeek['lastDay'];
  }
  return null;
});

export const getDate = createSelector(getSharedState, (state) => state.date);

export const allTasks = createSelector(getSharedState, (state) => state.tasks);

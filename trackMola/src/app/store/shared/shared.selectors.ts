import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getEmployeeState } from 'src/app/pages/employee/store/employee.selectors';
import { UserType } from 'src/app/shared/enums/enum';
import { ProfileUser } from 'src/app/shared/interfaces/interfaces';
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

export const getNavigationElems = createSelector(getEmployeeState, (state) => {
  if (state && state.user) {
    const usetInfo: ProfileUser = state.user;
    switch (usetInfo.type) {
      case UserType.Employee:
        return navigationItems;
    }
  }
  return null;
});

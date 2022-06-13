import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserType } from 'src/app/shared/enums/enum';
import { ProfileUser } from 'src/app/shared/interfaces/interfaces';
import { navigationItems } from 'src/app/shared/variables/variables';
import { EmployeeState } from './employee.state';

export const EMPLOYEE_STATE_NAME = 'employee';

const getEmployeeState =
  createFeatureSelector<EmployeeState>(EMPLOYEE_STATE_NAME);

export const getUserPhoto = createSelector(getEmployeeState, (state) => {
  if (state) {
    if (state.user) {
      const usetInfo: ProfileUser = state.user;
      return usetInfo.photo;
    }
  }
  return '';
});

export const getNavigationElems = createSelector(getEmployeeState, (state) => {
  if (state) {
    if (state.user) {
      const usetInfo: ProfileUser = state.user;
      switch (usetInfo.type) {
        case UserType.Employee:
          return [...navigationItems];
      }
    }
  }
  return null;
});

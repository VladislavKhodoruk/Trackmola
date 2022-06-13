import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileUser } from 'src/app/shared/interfaces/interfaces';
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

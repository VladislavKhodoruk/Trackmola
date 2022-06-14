import { logout } from 'src/app/pages/authrorization/store/authrorization.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { getUserDataSuccess } from './employee.actions';
import { EmployeeState, initialState } from './employee.state';

const employeeReducer = createReducer(
  initialState,
  on(getUserDataSuccess, (state, action) => ({
    ...state,
    user: { ...action.data },
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
  }))
);

export function EmployeeReducer(state: EmployeeState, action: Action) {
  return employeeReducer(state, action);
}

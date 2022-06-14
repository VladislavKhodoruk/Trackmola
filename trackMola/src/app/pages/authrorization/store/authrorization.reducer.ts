import { loginSuccess, logout } from './authrorization.actions';
import { AuthrorizationState, initialState } from './authrorization.state';
import { Action, createReducer, on } from '@ngrx/store';

const authrorizationReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    userType: action.userType,
  })),
  on(logout, (state) => ({
    ...state,
    userType: null,
  }))
);

export function AuthrorizationReducer(
  state: AuthrorizationState,
  action: Action
) {
  return authrorizationReducer(state, action);
}

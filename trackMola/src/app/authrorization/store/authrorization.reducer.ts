import { loginSuccess, logout } from './authrorization.actions';
import { AuthrorizationState, initialState } from './authrorization.state';
import { Action, createReducer, on } from '@ngrx/store';

const authrorizationReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({ ...state, user: action.user })),
  on(logout, (state) => ({
    ...state,
    user: null,
  }))
);

export function AuthrorizationReducer(
  state: AuthrorizationState | undefined,
  action: Action
) {
  return authrorizationReducer(state, action);
}

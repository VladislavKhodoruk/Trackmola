import { authorizationState, initialState } from './authorization.state';
import { Action, createReducer } from '@ngrx/store';

const authorizationReducer = createReducer(initialState);

export function AuthorizationReducer(
  state: authorizationState,
  action: Action
) {
  return authorizationReducer(state, action);
}

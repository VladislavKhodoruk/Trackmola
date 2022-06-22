import { AuthorizationState, initialState } from './authorization.state';
import { Action, createReducer } from '@ngrx/store';

const authorizationReducer = createReducer(initialState);

export function AuthorizationReducer(
  state: AuthorizationState,
  action: Action
) {
  return authorizationReducer(state, action);
}

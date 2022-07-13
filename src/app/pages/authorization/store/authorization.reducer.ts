import { Action, createReducer } from '@ngrx/store';

import { AuthorizationState, initialState } from './authorization.state';

const authorizationReducer = createReducer(initialState);

export function AuthorizationReducer(
  state: AuthorizationState,
  action: Action
) {
  return authorizationReducer(state, action);
}

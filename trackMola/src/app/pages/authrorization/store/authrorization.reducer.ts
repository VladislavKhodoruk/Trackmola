import { AuthrorizationState, initialState } from './authrorization.state';
import { Action, createReducer, on } from '@ngrx/store';

const authrorizationReducer = createReducer(initialState);

export function AuthrorizationReducer(
  state: AuthrorizationState,
  action: Action
) {
  return authrorizationReducer(state, action);
}

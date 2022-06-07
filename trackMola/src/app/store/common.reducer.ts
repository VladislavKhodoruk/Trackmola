import { loading, errorMessage } from './common.actions';

import { Action, createReducer, on } from '@ngrx/store';
import { CommonState, initialState } from './common.state';

const commonReducer = createReducer(
  initialState,
  on(loading, (state, action) => ({ ...state, loading: action.status })),
  on(errorMessage, (state, action) => ({
    ...state,
    errorMessage: action.message,
  }))
);

export function CommonReducer(state: CommonState | undefined, action: Action) {
  return commonReducer(state, action);
}

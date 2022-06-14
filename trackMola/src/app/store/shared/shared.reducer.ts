import { loading, errorMessage } from './shared.actions';

import { Action, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';

const sharedReducer = createReducer(
  initialState,
  on(loading, (state, action) => ({
    ...state,
    loadingStatus: { ...state.loadingStatus, loading: action.status },
  })),
  on(errorMessage, (state, action) => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      loaded: action.loaded,
      errorMessage: action.message,
    },
  }))
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}

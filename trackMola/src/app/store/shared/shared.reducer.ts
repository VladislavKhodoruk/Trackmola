import { loading, errorMessage, getUserDataSuccess } from './shared.actions';

import { Action, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';
import { logout } from 'src/app/pages/authrorization/store/authrorization.actions';

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
  })),
  on(getUserDataSuccess, (state, action) => ({
    ...state,
    user: { ...action.data },
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
  }))
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}

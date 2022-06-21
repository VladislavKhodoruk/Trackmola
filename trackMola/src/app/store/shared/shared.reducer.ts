import {
  loading,
  errorMessage,
  getUserDataSuccess,
  changeDate,
  getAllTasksSuccess,
} from './shared.actions';

import { Action, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';
import { logout } from 'src/app/pages/authorization/store/authorization.actions';

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
  })),
  on(changeDate, (state, action) => ({
    ...state,
    date: action.date,
  })),
  on(getAllTasksSuccess, (state, action) => ({
    ...state,
    tasks: action.tasks,
  }))
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}

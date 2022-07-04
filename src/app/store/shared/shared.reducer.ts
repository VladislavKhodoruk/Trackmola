import { Action, createReducer, on } from '@ngrx/store';
import { logout } from '@pages/authorization/store/authorization.actions';

import {
  changeDate,
  errorMessage,
  getAllTasksTrackSuccess,
  getUserDataSuccess,
  loading,
  nextWeek,
  previousWeek,
  setPeriod,
} from './shared.actions';
import { initialState, SharedState } from './shared.state';

const sharedReducer = createReducer(
  initialState,
  on(loading, (state: SharedState, action) => ({
    ...state,
    loadingStatus: { ...state.loadingStatus, loading: action.status },
  })),
  on(errorMessage, (state: SharedState, action) => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      loaded: action.loaded,
      errorMessage: action.message,
    },
  })),
  on(getUserDataSuccess, (state: SharedState, action) => ({
    ...state,
    user: { ...action.profileUser },
  })),
  on(logout, (state: SharedState) => ({
    ...state,
    user: null,
  })),
  on(changeDate, (state: SharedState, action) => ({
    ...state,
    date: action.date,
  })),
  on(getAllTasksTrackSuccess, (state: SharedState, action) => ({
    ...state,
    tasksTrack: action.tasksTrack,
  })),
  on(setPeriod, (state: SharedState, action) => ({
    ...state,
    period: action.period,
  })),
  on(nextWeek, (state: SharedState, action) => {
    const firstDay = state.period.start;
    const lastDay = state.period.end;
    return {
      ...state,
      period: {
        start: firstDay + action.value,
        end: lastDay + action.value,
      },
    };
  }),
  on(previousWeek, (state: SharedState, action) => {
    const firstDay = state.period.start;
    const lastDay = state.period.end;
    return {
      ...state,
      period: {
        start: firstDay - action.value,
        end: lastDay - action.value,
      },
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}

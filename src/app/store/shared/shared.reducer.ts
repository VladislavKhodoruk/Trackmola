import { Action, createReducer, on } from '@ngrx/store';
import { logout } from '@pages/authorization/store/authorization.actions';

import {
  changeDate,
  errorMessage,
  getAllTasksSuccess,
  getUserDataSuccess,
  loading,
  nextWeek,
  previousWeek,
  setFirstAndLastDay,
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
    user: { ...action.data },
  })),
  on(logout, (state: SharedState) => ({
    ...state,
    user: null,
  })),
  on(changeDate, (state: SharedState, action) => ({
    ...state,
    date: action.date,
  })),
  on(getAllTasksSuccess, (state: SharedState, action) => ({
    ...state,
    tasks: action.tasks,
  })),
  on(setFirstAndLastDay, (state: SharedState, action) => ({
    ...state,
    firstAndLastDay: action.firstAndLastDay,
  })),
  on(nextWeek, (state: SharedState, action) => {
    if (state.firstAndLastDay) {
      const firstDay = new Date(state.firstAndLastDay.start);
      const lastDay = new Date(state.firstAndLastDay.end);
      return {
        ...state,
        firstAndLastDay: {
          start: new Date(firstDay.getTime() + action.value).getTime(),
          end: new Date(lastDay.getTime() + action.value).getTime(),
        },
      };
    }
    return {
      ...state,
    };
  }),
  on(previousWeek, (state: SharedState, action) => {
    if (state.firstAndLastDay) {
      const firstDay = new Date(state.firstAndLastDay.start);
      const lastDay = new Date(state.firstAndLastDay.end);
      return {
        ...state,
        firstAndLastDay: {
          start: new Date(firstDay.getTime() - action.value).getTime(),
          end: new Date(lastDay.getTime() - action.value).getTime(),
        },
      };
    }
    return {
      ...state,
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}

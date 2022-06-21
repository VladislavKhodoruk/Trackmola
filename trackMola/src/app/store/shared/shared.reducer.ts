import {
  loading,
  errorMessage,
  getUserDataSuccess,
  changeDate,
  getAllTasksSuccess,
  setFirstAndLastDayOfWeek,
  nextWeek,
  previousWeek,
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
  })),
  on(setFirstAndLastDayOfWeek, (state, action) => ({
    ...state,
    firstAndLastDayOfWeek: action.firstAndLastDayOfWeek,
  })),
  on(nextWeek, (state, action) => {
    if (state.firstAndLastDayOfWeek) {
      const firstDay = state.firstAndLastDayOfWeek['firstDay'];
      const lastDay = state.firstAndLastDayOfWeek['lastDay'];
      return {
        ...state,
        firstAndLastDayOfWeek: {
          firstDay: new Date(firstDay.getTime() + action.value),
          lastDay: new Date(lastDay.getTime() + action.value),
        },
      };
    }
    return {
      ...state,
    };
  }),
  on(previousWeek, (state, action) => {
    if (state.firstAndLastDayOfWeek) {
      const firstDay = state.firstAndLastDayOfWeek['firstDay'];
      const lastDay = state.firstAndLastDayOfWeek['lastDay'];
      return {
        ...state,
        firstAndLastDayOfWeek: {
          firstDay: new Date(firstDay.getTime() - action.value),
          lastDay: new Date(lastDay.getTime() - action.value),
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

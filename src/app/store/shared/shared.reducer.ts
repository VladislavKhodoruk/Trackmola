import { Action, createReducer, on } from '@ngrx/store';
import { logout } from '@pages/authorization/store/authorization.actions';

import {
  changeDate,
  errorMessage,
  getAllTasksSuccess,
  getAllTasksUpdate,
  getUserDataSuccess,
  loading,
  nextWeek,
  previousWeek,
  setFirstAndLastDayOfWeek,
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
  on(getAllTasksUpdate, (state: SharedState, action) => {
    const addTaskTracks = state.tasks.concat(action.task);
    return {
      ...state,
      tasks: addTaskTracks,
    };
  }),
  on(setFirstAndLastDayOfWeek, (state: SharedState, action) => ({
    ...state,
    firstAndLastDayOfWeek: action.firstAndLastDayOfWeek,
  })),
  on(nextWeek, (state: SharedState, action) => {
    if (state.firstAndLastDayOfWeek) {
      const firstDay = state.firstAndLastDayOfWeek.firstDay;
      const lastDay = state.firstAndLastDayOfWeek.lastDay;
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
  on(previousWeek, (state: SharedState, action) => {
    if (state.firstAndLastDayOfWeek) {
      const firstDay = state.firstAndLastDayOfWeek.firstDay;
      const lastDay = state.firstAndLastDayOfWeek.lastDay;
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

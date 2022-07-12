import { Action, createReducer, on } from '@ngrx/store';
import { logout } from '@pages/authorization/store/authorization.actions';
import {
  changeDate,
  errorMessage,
  getAllTaskTracksSuccess,
  getAllTasksSuccess,
  getAllProjectsSuccess,
  getUserDataSuccess,
  loading,
  nextWeek,
  previousWeek,
  setPeriod,
  getAllUsersSuccess,
} from './common.actions';
import { initialState, CommonState } from './common.state';

const commonReducer = createReducer(
  initialState,
  on(loading, (state: CommonState, action) => ({
    ...state,
    loadingStatus: { ...state.loadingStatus, loading: action.status },
  })),
  on(errorMessage, (state: CommonState, action) => ({
    ...state,
    loadingStatus: {
      ...state.loadingStatus,
      loaded: action.loaded,
      errorMessage: action.message,
    },
  })),
  on(getUserDataSuccess, (state: CommonState, action) => ({
    ...state,
    user: { ...action.profileUser },
  })),
  on(logout, (state: CommonState) => ({
    ...state,
    user: null,
  })),
  on(changeDate, (state: CommonState, action) => ({
    ...state,
    date: action.date,
  })),
  on(getAllTaskTracksSuccess, (state: CommonState, { taskTracks }) => ({
    ...state,
    taskTracks,
  })),
  on(getAllTasksSuccess, (state: CommonState, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(getAllProjectsSuccess, (state: CommonState, { projects }) => ({
    ...state,
    projects,
  })),
  on(getAllUsersSuccess, (state: CommonState, { users }) => ({
    ...state,
    users,
  })),
  on(setPeriod, (state: CommonState, action) => ({
    ...state,
    period: action.period,
  })),
  on(nextWeek, (state: CommonState, action) => {
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
  on(previousWeek, (state: CommonState, action) => {
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

export function CommonReducer(state: CommonState | undefined, action: Action) {
  return commonReducer(state, action);
}

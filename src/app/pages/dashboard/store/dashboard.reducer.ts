import { Action, createReducer, on } from '@ngrx/store';
import { DashboardState, dashboardState } from './dashboard.state';
import {
  getActiveTasksSuccess,
  getAllProjectsSuccess,
  getAllTasksSuccess, getAllTaskTracksSuccess,
  getAllUsersSuccess,
  getWeekReportTimeSuccess
} from "./dashboard.actions";

const dashboardReducer = createReducer(
  dashboardState,
  on(getWeekReportTimeSuccess, (state: DashboardState, { weekReportTime }) => ({
    ...state,
    weekReportTime,
  })),

  on(getAllProjectsSuccess, (state: DashboardState, { allProjects }) => ({
    ...state,
    allProjects: allProjects,
  })),

  on(getAllTasksSuccess, (state: DashboardState, { allTasks }) => ({
    ...state,
    allTasks: allTasks,
  })),

  on(getAllUsersSuccess, (state: DashboardState, { allUsers }) => ({
    ...state,
    allUsers: allUsers,
  })),

  on(getActiveTasksSuccess, (state: DashboardState, { activeTasks }) => ({
    ...state,
    activeTasks: activeTasks,
  })),

  on(getAllTaskTracksSuccess, (state: DashboardState, { allTaskTracks }) => ({
    ...state,
    allTaskTracks: allTaskTracks,
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';

import {
  getWeekReportTimeSuccess,
  setProjectFilter,
  removeProjectFilter,
  changeManagerMainView,
  setActiveTask,
  clearDashboardState,
  setActiveProjectFilter,
} from './dashboard.actions';
import { DashboardState, dashboardState } from './dashboard.state';

const dashboardReducer = createReducer(
  dashboardState,
  on(getWeekReportTimeSuccess, (state: DashboardState, { weekReportTime }) => ({
    ...state,
    weekReportTime,
  })),
  on(setProjectFilter, (state: DashboardState, { projectName }) => {
    const projectsFilter = [...state.manager.projectsFilter];
    if (!projectsFilter.includes(projectName)) {
      projectsFilter.push(projectName);
    }
    return {
      ...state,
      manager: { ...state.manager, projectsFilter },
    };
  }),
  on(setActiveProjectFilter, (state: DashboardState, { activeProject }) => ({
    ...state,
    manager: {
      ...state.manager,
      activeProjectFilter: activeProject,
      selectedTask: dashboardState.manager.selectedTask,
    },
  })),
  on(removeProjectFilter, (state: DashboardState) => ({
    ...state,
    manager: {
      ...state.manager,
      activeProjectFilter: dashboardState.manager.activeProjectFilter,
      selectedTask: dashboardState.manager.selectedTask,
    },
  })),
  on(changeManagerMainView, (state: DashboardState, { mode }) => ({
    ...state,
    manager: { ...state.manager, modeView: mode },
  })),
  on(setActiveTask, (state: DashboardState, { task }) => ({
    ...state,
    manager: { ...state.manager, selectedTask: task },
  })),
  on(clearDashboardState, () => ({
    ...dashboardState,
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

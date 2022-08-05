import { Action, createReducer, on } from '@ngrx/store';

import {
  getWeekReportTimeSuccess,
  setProjectFilter,
  removeActiveProject,
  changeManagerMainView,
  clearDashboardState,
  setActiveProjectFilter,
  removeProjectFilter,
  changeDashboardView,
  changeManagerPeriod,
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
    },
  })),
  on(removeProjectFilter, (state: DashboardState, { project }) => {
    const newFilter = state.manager.projectsFilter.filter(
      (projectName) => projectName !== project.name
    );

    return {
      ...state,
      manager: {
        ...state.manager,
        activeProjectFilter: dashboardState.manager.activeProjectFilter,
        projectsFilter: newFilter,
      },
    };
  }),
  on(removeActiveProject, (state: DashboardState) => ({
    ...state,
    manager: {
      ...state.manager,
      activeProjectFilter: dashboardState.manager.activeProjectFilter,
    },
  })),
  on(changeManagerMainView, (state: DashboardState, { mode }) => ({
    ...state,
    manager: { ...state.manager, modeView: mode },
  })),

  on(changeDashboardView, (state: DashboardState, { dashboardView }) => ({
    ...state,
    dashboardView,
  })),
  on(changeManagerPeriod, (state: DashboardState, { period }) => ({
    ...state,
    manager: { ...state.manager, period },
  })),
  on(clearDashboardState, () => ({
    ...dashboardState,
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

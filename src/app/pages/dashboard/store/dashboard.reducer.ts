import { Action, createReducer, on } from '@ngrx/store';

import {
  getWeekReportTimeSuccess,
  setProjectFilter,
  removeProjectFilter,
  changeManagerMainView,
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
  on(removeProjectFilter, (state: DashboardState, { projectName }) => {
    const projectsFilter = [...state.manager.projectsFilter].filter(
      (name) => name !== projectName
    );
    return {
      ...state,
      manager: { ...state.manager, projectsFilter },
    };
  }),
  on(changeManagerMainView, (state: DashboardState, { mode }) => ({
    ...state,
    manager: { ...state.manager, modeView: mode },
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

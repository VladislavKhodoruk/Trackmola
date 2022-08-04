import { Action, createReducer, on } from '@ngrx/store';

import {
  getWeekReportTimeSuccess,
  setProjectFilter,
  removeActiveProject,
  changeManagerMainView,
  setActiveTask,
  clearDashboardState,
  setActiveProjectFilter,
  removeProjectFilter,
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
  on(removeProjectFilter, (state: DashboardState, { project }) => {
    const newFilter = state.manager.projectsFilter.filter(
      (projectName) => projectName !== project.name
    );

    return {
      ...state,
      manager: {
        ...state.manager,
        projectsFilter: newFilter,
      },
    };
  }),
  on(removeActiveProject, (state: DashboardState) => ({
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
  on(setActiveTask, (state: DashboardState, { task }) => {
    if (
      state.manager.selectedTask &&
      state.manager.selectedTask.id === task.id
    ) {
      return {
        ...state,
        manager: {
          ...state.manager,
          selectedTask: dashboardState.manager.selectedTask,
        },
      };
    }

    return {
      ...state,
      manager: { ...state.manager, selectedTask: task },
    };
  }),
  on(clearDashboardState, () => ({
    ...dashboardState,
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

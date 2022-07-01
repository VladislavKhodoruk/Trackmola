import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteProject,
  deleteSelectedProject,
  getTasksSuccess,
  setSearchValue,
  setSelectedProject,
  getProjectsSuccess,
  getActiveTasksInProjectSuccess,
  getAllUsersSuccess,
} from './projects.actions';

import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(
  projectsState,
  on(getTasksSuccess, (state: ProjectsState, action) => ({
    ...state,
    tasks: action.tasks,
  })),
  on(getProjectsSuccess, (state: ProjectsState, action) => ({
    ...state,
    projects: action.projects,
  })),
  on(getActiveTasksInProjectSuccess, (state: ProjectsState, action) => ({
    ...state,
    activeTasksInProjects: [...state.activeTasksInProjects, ...action.tasks],
  })),
  on(getAllUsersSuccess, (state: ProjectsState, action) => ({
    ...state,
    users: action.usersInfo,
  })),
  on(deleteProject, (state: ProjectsState, action) => ({
    ...state,
    activeTasksInProjects: state.activeTasksInProjects.filter(
      ({ projectId }) => {
        const compareProjectId = projectId !== action.id;
        return compareProjectId;
      }
    ),
  })),
  on(setSelectedProject, (state: ProjectsState, action) => ({
    ...state,
    selectedProject: action.project,
  })),
  on(deleteSelectedProject, (state: ProjectsState) => ({
    ...state,
    selectedProject: projectsState.selectedProject,
  })),
  on(setSearchValue, (state: ProjectsState, action) => ({
    ...state,
    searchValue: action.value,
  }))
);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

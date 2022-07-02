import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteSelectedProject,
  setSearchValue,
  setSelectedProject,
  getAllProjectsSuccess,
  getAllUsersSuccess,
  clearProjectStore,
  getAllTasksSuccess,
} from './projects.actions';

import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(
  projectsState,
  on(getAllTasksSuccess, (state: ProjectsState, action) => ({
    ...state,
    allTasks: action.tasks,
  })),
  on(getAllProjectsSuccess, (state: ProjectsState, action) => ({
    ...state,
    allProjects: action.projects,
  })),
  on(getAllUsersSuccess, (state: ProjectsState, action) => ({
    ...state,
    users: action.users,
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
  })),
  on(clearProjectStore, () => ({
    ...projectsState,
  }))
);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

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
  on(getAllTasksSuccess, (state: ProjectsState, { tasks }) => ({
    ...state,
    allTasks: tasks,
  })),
  on(getAllProjectsSuccess, (state: ProjectsState, { projects }) => ({
    ...state,
    allProjects: projects,
  })),
  on(getAllUsersSuccess, (state: ProjectsState, { users }) => ({
    ...state,
    users,
  })),
  on(setSelectedProject, (state: ProjectsState, { project }) => ({
    ...state,
    selectedProject: project,
  })),
  on(deleteSelectedProject, (state: ProjectsState) => ({
    ...state,
    selectedProject: projectsState.selectedProject,
  })),
  on(setSearchValue, (state: ProjectsState, { value }) => ({
    ...state,
    searchValue: value,
  })),
  on(clearProjectStore, () => ({
    ...projectsState,
  }))
);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import {
  setSearchValue,
  getProjectsSuccess,
  getUsersSuccess,
  clearProjectStore,
  getTaskTracksSuccess,
  getTasksSuccess,
} from './projects.actions';

import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(
  projectsState,
  on(getTaskTracksSuccess, (state: ProjectsState, { taskTracks }) => ({
    ...state,
    taskTracks,
  })),
  on(getTasksSuccess, (state: ProjectsState, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(getProjectsSuccess, (state: ProjectsState, { projects }) => ({
    ...state,
    projects,
  })),
  on(getUsersSuccess, (state: ProjectsState, { users }) => ({
    ...state,
    users,
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

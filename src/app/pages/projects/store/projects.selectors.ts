import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { ProjectsState } from './projects.state';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getProjects = createSelector(
  getProjectsState,
  ({ projects }) => projects
);

export const getTasks = createSelector(getProjectsState, ({ tasks }) => tasks);

export const getTaskTracks = createSelector(
  getProjectsState,
  ({ taskTracks }) => taskTracks
);

export const getUsers = createSelector(getProjectsState, ({ users }) => users);

export const getSelectedProject = createSelector(
  getProjectsState,
  ({ selectedProject }) => selectedProject
);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

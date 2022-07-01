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

export const getActiveTasksInProjects = createSelector(
  getProjectsState,
  ({ activeTasksInProjects }) => activeTasksInProjects
);

/* export const getActiveTasksInProjects = (props: { projectId: string }) =>
  createSelector(getProjectsState, (state) =>
    state.activeTasksInProjects.filter(({ projectId }) => {
      const projectCompare = projectId === props.projectId;
      return projectCompare;
    })
  ); */

export const getSelectedProject = createSelector(
  getProjectsState,
  ({ selectedProject }) => selectedProject
);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

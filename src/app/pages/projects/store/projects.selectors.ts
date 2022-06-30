import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName, TaskStatus } from '@shared/enums/enum';
import { ProjectsState } from './projects.state';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getProjects = createSelector(
  getProjectsState,
  ({ projects }) => projects
);

/* export const getAllTasksInProject = (props: { project: string }) =>
  createSelector(getProjectsState, (state) =>
    state.allTasksInProjects.filter(({ projectId, status }) => {
      const projectCompare = projectId === props.project;
      const statusCompare =
        status === TaskStatus.InProgress || status === TaskStatus.Open;

      return projectCompare && statusCompare;
    })
  );

export const getUsersPhotoInProject = (props: { project: string }) =>
  createSelector(getProjectsState, (state) =>
    state.userInProjects
      .filter(({ projectId }) => {
        const projectCompare = projectId === props.project;
        return projectCompare;
      })
      .map(({ photo }) => photo)
  ); */

export const getSelectedProject = createSelector(
  getProjectsState,
  ({ selectedProject }) => selectedProject
);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

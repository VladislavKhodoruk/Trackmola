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

export const getActiveTasksInProjects = (props: { projectId: string }) =>
  createSelector(getProjectsState, (state) =>
    state.activeTasksInProjects.filter(
      ({ projectId }) => projectId === props.projectId
    )
  );

export const getUsersInProjects = (props: { projectId: string }) =>
  createSelector(getProjectsState, (state) => {
    const usersInProjects = state.activeTasksInProjects
      .filter(({ projectId }) => projectId === props.projectId)
      .map((task) => task.userId);
    return state.users.filter(({ id }) => usersInProjects.includes(id));
  });

export const getSelectedProject = createSelector(
  getProjectsState,
  ({ selectedProject }) => selectedProject
);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

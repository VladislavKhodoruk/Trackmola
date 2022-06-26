import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { ProjectsState } from './projects.state';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getMyProgects = createSelector(
  getProjectsState,
  (state) => state.myProjects
);

export const getAllTasksInProject = (props: { project: string }) =>
  createSelector(getProjectsState, (state) =>
    state.allTasksInProjects.filter((task) => {
      if (task.projectId === props.project && task.status === 'in progress') {
        return task;
      }
    })
  );

export const getUsersPhotoInProject = (props: { project: string }) =>
  createSelector(getProjectsState, (state) =>
    state.userInProjects
      .filter((profile) => {
        if (profile.projectId === props.project) {
          return profile;
        }
      })
      .map((profile) => profile.photo)
  );

export const getSelectedProject = createSelector(
  getProjectsState,
  (state) => state.selectedProject
);

export const getSearchValue = createSelector(
  getProjectsState,
  (state) => state.searchValue
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName, TaskStatus } from '@shared/enums/enum';
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
      const projectCompare = task.projectId === props.project;
      const statusCompare =
        task.status === TaskStatus.InProgress ||
        task.status === TaskStatus.Open;

      if (projectCompare && statusCompare) {
        return true;
      }
      return false;
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

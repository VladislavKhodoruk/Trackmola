import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName, TaskStatus } from '@shared/enums/enum';
import { ProjectsState } from './projects.state';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getMyProjects = createSelector(getProjectsState, (state) => {
  if (state.allTasks) {
    const myProjects = state.allTasks
      .filter(({ userId }) => userId === localStorage.AuthUserId)
      .map((task) => task.projectId);

    return state.allProjects.filter((project) =>
      myProjects.includes(project.id)
    );
  }
});

export const getActiveTasksInProjects = (props: { projectId: string }) =>
  createSelector(getProjectsState, (state) => {
    if (state.allTasks) {
      return state.allTasks.filter(({ projectId, status }) => {
        const compareProject = projectId === props.projectId;
        const compareStatus = status === TaskStatus.InProgress;
        return compareProject && compareStatus;
      });
    }
  });

export const getUsersInProjects = (props: { projectId: string }) =>
  createSelector(getProjectsState, (state) => {
    if (state.allTasks) {
      const usersInProjects = state.allTasks
        .filter(({ projectId }) => projectId === props.projectId)
        .map((task) => task.userId);
      return state.users.filter(({ id }) => usersInProjects.includes(id));
    }
  });

export const getSelectedProject = createSelector(
  getProjectsState,
  ({ selectedProject }) => selectedProject
);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

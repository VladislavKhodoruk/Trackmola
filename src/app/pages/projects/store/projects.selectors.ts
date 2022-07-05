import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { ProjectsState } from './projects.state';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getMyProjects = createSelector(getProjectsState, (state) => {
  if (state.allTaskTracks) {
    const myProjects = state.allTaskTracks
      .filter(({ userId }) => userId === localStorage.getItem('AuthUserId'))
      .map((task) => task.projectId);

    return state.allProjects.filter((project) =>
      myProjects.includes(project.id)
    );
  }
});

export const getAllTaskTracks = createSelector(
  getProjectsState,
  ({ allTaskTracks }) => allTaskTracks
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

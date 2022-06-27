import { Action, createReducer, on } from '@ngrx/store';
import {
  clearProjectStore,
  deleteProject,
  deleteSelectedProject,
  getProjectsSuccess,
  getTasksInProjectSuccess,
  getUsersProfileInProjectSuccess,
  setSearchValue,
  setSelectedProject,
} from './projects.actions';
import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(
  projectsState,
  on(getProjectsSuccess, (state: ProjectsState, action) => ({
    ...state,
    myProjects: action.data,
  })),
  on(deleteProject, (state: ProjectsState, action) => ({
    ...state,
    allTasksInProjects: state.allTasksInProjects.filter((task) => {
      const compareProjectId = task.projectId !== action.id;
      return compareProjectId;
    }),
    userInProjects: state.userInProjects.filter((user) => {
      const compareProjectId = user.projectId !== action.id;
      return compareProjectId;
    }),
  })),
  on(getTasksInProjectSuccess, (state: ProjectsState, action) => ({
    ...state,
    allTasksInProjects: [...state.allTasksInProjects, ...action.data],
  })),
  on(getUsersProfileInProjectSuccess, (state: ProjectsState, action) => ({
    ...state,
    userInProjects: [...state.userInProjects, ...action.usersProfiles],
  })),
  on(setSelectedProject, (state: ProjectsState, action) => ({
    ...state,
    selectedProject: action.project,
  })),
  on(deleteSelectedProject, (state: ProjectsState) => ({
    ...state,
    selectedProject: projectsState.selectedProject,
  })),
  on(setSearchValue, (state: ProjectsState, action) => ({
    ...state,
    searchValue: action.value,
  })),
  on(clearProjectStore, () => projectsState)
);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import {
  clearProjectStore,
  getProjectsSuccess,
  getTasksInProjectSuccess,
} from './projects.actions';
import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(
  projectsState,
  on(getProjectsSuccess, (state: ProjectsState, action) => ({
    ...state,
    myProjects: action.data,
  })),
  on(getTasksInProjectSuccess, (state: ProjectsState, action) => ({
    ...state,
    allTasksInProjects: [...state.allTasksInProjects, ...action.data],
  })),
  on(clearProjectStore, () => projectsState)
);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

import { Action, createReducer } from '@ngrx/store';
import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(projectsState);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

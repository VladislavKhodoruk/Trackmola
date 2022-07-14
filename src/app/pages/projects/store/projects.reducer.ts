import { Action, createReducer, on } from '@ngrx/store';

import { setSearchValue, clearProjectState } from './projects.actions';

import { ProjectsState, projectsState } from './projects.state';

const projectsReducer = createReducer(
  projectsState,
  on(setSearchValue, (state: ProjectsState, { value }) => ({
    ...state,
    searchValue: value,
  })),
  on(clearProjectState, () => ({
    ...projectsState,
  }))
);

export function ProjectsReducer(state: ProjectsState, action: Action) {
  return projectsReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';

import { setUser } from './team.actions';

import { teamState, TeamState } from './team.state';

const teamReducer = createReducer(
  teamState,
  on(setUser, (state: TeamState, action) => ({
    ...state,
    user: action.user,
  }))
);

export function TeamReducer(state: TeamState, action: Action) {
  return teamReducer(state, action);
}

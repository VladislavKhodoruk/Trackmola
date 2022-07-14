import { Action, createReducer } from '@ngrx/store';

import { teamState, TeamState } from './team.state';

const teamReducer = createReducer(teamState);

export function TeamReducer(state: TeamState, action: Action) {
  return teamReducer(state, action);
}

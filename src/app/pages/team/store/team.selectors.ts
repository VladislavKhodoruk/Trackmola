import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TeamState } from './team.state';

import { StateName } from '@shared/enums/enum';

export const TEAM_STATE_NAME = StateName.Team;

const getTeamState = createFeatureSelector<TeamState>(TEAM_STATE_NAME);

export const getUser = createSelector(getTeamState, ({ user }) => user);

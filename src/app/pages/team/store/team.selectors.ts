import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TeamState } from './team.state';

import { StateName } from '@shared/enums/enum';
import { User, Vacation } from '@shared/interfaces/interfaces';
import { getVacations } from '@store/common/common.selectors';

export const TEAM_STATE_NAME = StateName.Team;

const getTeamState = createFeatureSelector<TeamState>(TEAM_STATE_NAME);

export const getUser = createSelector(getTeamState, ({ user }) => user);

export const getVacationsForPickTeamMember = createSelector(
  getUser,
  getVacations,
  (user: User, vacations: Vacation[]) => {
    if (user) {
      return vacations.filter(
        (vacation: Vacation) => vacation.userId === user.id
      );
    }
  }
);

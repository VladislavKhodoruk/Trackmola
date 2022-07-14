import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProfileState } from './profile.state';

import { StateName } from '@shared/enums/enum';

export const PROFILE_STATE_NAME = StateName.Profile;

const getProfileState = createFeatureSelector<ProfileState>(PROFILE_STATE_NAME);

export const getProfileUser = createSelector(
  getProfileState,
  ({ profileUser }) => profileUser
);

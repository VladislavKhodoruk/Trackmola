import { Action, createReducer, on } from '@ngrx/store';

import { getUserInfoSuccess } from './profile.actions';
import { profileState, ProfileState } from './profile.state';

const profileReducer = createReducer(
  profileState,
  on(getUserInfoSuccess, (state: ProfileState, { profileUser }) => ({
    ...state,
    profileUser,
  }))
);

export function ProfileReducer(state: ProfileState, action: Action) {
  return profileReducer(state, action);
}

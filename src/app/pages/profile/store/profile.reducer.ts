import { Action, createReducer } from '@ngrx/store';
import { profileState, ProfileState } from './profile.state';
import { getUserInfoSuccess } from './profile.actions';
import { on } from '@ngrx/store';

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

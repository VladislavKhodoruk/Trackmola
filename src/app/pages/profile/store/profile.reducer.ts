import { Action, createReducer } from '@ngrx/store';
import { profileState, ProfileState } from './profile.state';

const profileReducer = createReducer(profileState);

export function ProfileReducer(state: ProfileState, action: Action) {
  return profileReducer(state, action);
}

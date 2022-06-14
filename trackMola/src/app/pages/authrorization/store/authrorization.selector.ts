import { AuthrorizationState } from './authrorization.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const AUTH_STATE_NAME = 'authrorization';

const getAuthrorizationState =
  createFeatureSelector<AuthrorizationState>(AUTH_STATE_NAME);

export const getUserType = createSelector(getAuthrorizationState, (state) => {
  if (state && state.userType) {
    const userType: string = state.userType;
    return userType;
  }
  return '';
});

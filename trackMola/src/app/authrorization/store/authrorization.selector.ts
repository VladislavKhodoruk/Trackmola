import { AuthrorizationState } from './authrorization.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const AUTH_STATE_NAME = 'authrorization';

const getAuthrorizationState =
  createFeatureSelector<AuthrorizationState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthrorizationState, (state) =>
  state.user ? true : false
);

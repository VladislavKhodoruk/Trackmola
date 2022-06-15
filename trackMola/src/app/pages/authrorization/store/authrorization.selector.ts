import { AuthrorizationState } from './authrorization.state';
import { createFeatureSelector } from '@ngrx/store';

export const AUTH_STATE_NAME = 'authrorization';

const getAuthrorizationState =
  createFeatureSelector<AuthrorizationState>(AUTH_STATE_NAME);

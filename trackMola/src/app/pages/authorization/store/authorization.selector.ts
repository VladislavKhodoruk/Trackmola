import { authorizationState } from './authorization.state';
import { createFeatureSelector } from '@ngrx/store';

export const AUTH_STATE_NAME = 'authorization';

const getauthorizationState =
  createFeatureSelector<authorizationState>(AUTH_STATE_NAME);

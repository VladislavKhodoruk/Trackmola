import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from './custom-serializer';

import { StateName } from '@shared/enums/enum';

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>(StateName.Router);

export const getCurrentRoute = createSelector(
  getRouterState,
  (router) => router.state
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashboardState } from './dashboard.state';

import { StateName } from '@shared/enums/enum';

export const DASHBOARD_STATE_NAME = StateName.Dashboard;

const getDashboardState =
  createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);

export const getWeekReportTime = createSelector(
  getDashboardState,
  ({ weekReportTime }) => weekReportTime
);

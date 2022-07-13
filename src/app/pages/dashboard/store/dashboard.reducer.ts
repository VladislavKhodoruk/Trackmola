import { Action, createReducer, on } from '@ngrx/store';

import { getWeekReportTimeSuccess } from './dashboard.actions';
import { DashboardState, dashboardState } from './dashboard.state';

const dashboardReducer = createReducer(
  dashboardState,
  on(getWeekReportTimeSuccess, (state: DashboardState, { weekReportTime }) => ({
    ...state,
    weekReportTime,
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

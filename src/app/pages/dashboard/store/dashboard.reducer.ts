import { Action, createReducer, on } from '@ngrx/store';
import { DashboardState, dashboardState } from './dashboard.state';
import { getWeekReportTimeSuccess } from './dashboard.actions';

const dashboardReducer = createReducer(
  dashboardState,
  on(getWeekReportTimeSuccess, (state: DashboardState, action) => ({
    ...state,
    weekReportTime: action.weekReportTime,
  }))
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

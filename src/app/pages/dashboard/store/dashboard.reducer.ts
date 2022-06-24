import { Action, createReducer } from '@ngrx/store';
import { DashboardState, dashboardState } from './dashboard.state';

const dashboardReducer = createReducer(dashboardState);

export function DashboardReducer(state: DashboardState, action: Action) {
  return dashboardReducer(state, action);
}

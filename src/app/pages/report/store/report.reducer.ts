import { Action, createReducer } from '@ngrx/store';
import { ReportState, reportState } from './report.state';

const reportReducer = createReducer(reportState);

export function ReportReducer(state: ReportState, action: Action) {
  return reportReducer(state, action);
}

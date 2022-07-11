import { Action, createReducer } from '@ngrx/store';
import { teamState, ReportConstructorState } from './report-constructor.state';

const reportConstructorReducer = createReducer(teamState);

export function ReportConstructorReducer(
  state: ReportConstructorState,
  action: Action
) {
  return reportConstructorReducer(state, action);
}

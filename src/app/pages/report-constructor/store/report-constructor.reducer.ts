import { Action, createReducer } from '@ngrx/store';
import {
  reportConstructorState,
  ReportConstructorState,
} from './report-constructor.state';

const reportConstructorReducer = createReducer(reportConstructorState);

export function ReportConstructorReducer(
  state: ReportConstructorState,
  action: Action
) {
  return reportConstructorReducer(state, action);
}

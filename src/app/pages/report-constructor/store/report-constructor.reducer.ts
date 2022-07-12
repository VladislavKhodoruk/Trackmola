import { Action, createReducer, on } from '@ngrx/store';
import {
  reportConstructorState,
  ReportConstructorState,
} from './report-constructor.state';
import { setPeriod, setProject } from './report-constructor.actions';

const reportConstructorReducer = createReducer(
  reportConstructorState,
  on(setPeriod, (state: ReportConstructorState, { period }) => ({
    ...state,
    period,
  })),
  on(setProject, (state: ReportConstructorState, { projectId }) => ({
    ...state,
    projectId,
  }))
);

export function ReportConstructorReducer(
  state: ReportConstructorState,
  action: Action
) {
  return reportConstructorReducer(state, action);
}

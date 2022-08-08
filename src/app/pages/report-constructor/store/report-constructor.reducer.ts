import { Action, createReducer, on } from '@ngrx/store';

import {
  setPeriod,
  setProject,
  changeViewMode,
  changeChartViewMode,
  setUser,
} from './report-constructor.actions';
import {
  reportConstructorState,
  ReportConstructorState,
} from './report-constructor.state';

const reportConstructorReducer = createReducer(
  reportConstructorState,
  on(setPeriod, (state: ReportConstructorState, { period }) => ({
    ...state,
    period,
  })),
  on(setProject, (state: ReportConstructorState, { projectId }) => ({
    ...state,
    projectId,
  })),
  on(setUser, (state: ReportConstructorState, { userId }) => ({
    ...state,
    userId,
  })),
  on(changeViewMode, (state: ReportConstructorState, { viewMode }) => ({
    ...state,
    chartViewMode: reportConstructorState.chartViewMode,
    viewMode,
  })),
  on(
    changeChartViewMode,
    (state: ReportConstructorState, { chartViewMode }) => ({
      ...state,
      chartViewMode,
    })
  )
);

export function ReportConstructorReducer(
  state: ReportConstructorState,
  action: Action
) {
  return reportConstructorReducer(state, action);
}

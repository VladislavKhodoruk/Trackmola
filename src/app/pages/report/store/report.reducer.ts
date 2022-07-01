import { Action, createReducer, on } from '@ngrx/store';
import { ReportState, reportState } from './report.state';
import { getAllTasksSuccess, getAllProjectsSuccess } from './report.actions';

const reportReducer = createReducer(
  reportState,
  on(getAllTasksSuccess, (state: ReportState, action) => ({
    ...state,
    allTasks: action.allTasks,
  })),
  on(getAllProjectsSuccess, (state: ReportState, action) => ({
    ...state,
    allProjects: action.allProjects,
  }))
);

export function ReportReducer(state: ReportState, action: Action) {
  return reportReducer(state, action);
}

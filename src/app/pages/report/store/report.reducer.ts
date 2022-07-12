import { Action, createReducer, on } from '@ngrx/store';
import { ReportState, reportState } from './report.state';
import {
  getAllTasksSuccess,
  getAllProjectsSuccess,
  putTaskTrack,
} from './report.actions';

const reportReducer = createReducer(
  reportState,
  on(getAllTasksSuccess, (state: ReportState, action) => ({
    ...state,
    allTasks: action.allTasks,
  })),
  on(getAllProjectsSuccess, (state: ReportState, action) => ({
    ...state,
    allProjects: action.allProjects,
  })),
  on(putTaskTrack, (state: ReportState, { taskTrack }) => ({
    ...state,
    taskTrack,
  }))
);

export function ReportReducer(state: ReportState, action: Action) {
  return reportReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';

import {
  getAllTasksSuccess,
  getAllProjectsSuccess,
  putTaskTrack,
  addTask,
} from './report.actions';
import { ReportState, reportState } from './report.state';

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
  })),
  on(addTask, (state: ReportState, { task }) => ({
    ...state,
    task,
  }))
);

export function ReportReducer(state: ReportState, action: Action) {
  return reportReducer(state, action);
}

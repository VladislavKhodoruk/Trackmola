import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReportState } from './report.state';

import { StateName } from '@shared/enums/enum';

export const REPORT_STATE_NAME = StateName.Report;

const getReportState = createFeatureSelector<ReportState>(REPORT_STATE_NAME);

export const getAllTasksData = createSelector(
  getReportState,
  (state) => state.allTasks
);

export const getAllProjectsData = createSelector(
  getReportState,
  (state) => state.allProjects
);

export const getTaskTrack = createSelector(
  getReportState,
  (state) => state.taskTrack
);

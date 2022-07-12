import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { getTasksTrack } from '@store/common/common.selectors';
import { ReportConstructorState } from './report-constructor.state';

export const REPORT_CONSTRUCTOR_STATE_NAME = StateName.ReportConstructor;

const getProjectsState = createFeatureSelector<ReportConstructorState>(
  REPORT_CONSTRUCTOR_STATE_NAME
);

export const getProject = createSelector(
  getProjectsState,
  ({ projectId }) => projectId
);

export const getPeriod = createSelector(
  getProjectsState,
  ({ period }) => period
);

export const getTaskTracks = createSelector(
  getTasksTrack,
  getPeriod,
  getProject,
  (taskTracks, period, projectId) =>
    taskTracks.filter(
      (taskTrack) =>
        taskTrack.projectId === projectId &&
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

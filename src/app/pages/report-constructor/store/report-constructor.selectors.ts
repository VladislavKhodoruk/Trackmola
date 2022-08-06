import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReportConstructorState } from './report-constructor.state';

import { StateName } from '@shared/enums/enum';
import { getTasks, getTasksTrack } from '@store/common/common.selectors';

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

export const getViewMode = createSelector(
  getProjectsState,
  ({ viewMode }) => viewMode
);

export const getChartViewMode = createSelector(
  getProjectsState,
  ({ chartViewMode }) => chartViewMode
);

export const getTasksTrackByPeriod = createSelector(
  getTasksTrack,
  getPeriod,
  (taskTracks, period) =>
    taskTracks.filter(
      (taskTrack) =>
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

export const taskTracksDurationGroupByTask = createSelector(
  getTasks,
  getTasksTrackByPeriod,
  (tasks, taskTracks) =>
    tasks.reduce((accum, task) => {
      const activeTaskTracks = taskTracks
        .filter((taskTrack) => taskTrack.taskId === task.id)
        .reduce((result, { duration }) => (result += duration), 0);
      return { ...accum, [task.id]: activeTaskTracks };
    }, {})
);

export const taskTracksGroupByTask = createSelector(
  getTasks,
  getTasksTrackByPeriod,
  (tasks, taskTracks) =>
    tasks.reduce((accum, task) => {
      const activeTasks = taskTracks.filter(({ taskId }) => taskId === task.id);
      return { ...accum, [task.id]: activeTasks };
    }, {})
);

export const getDateForChart = createSelector(
  getTasks,
  getProject,
  getTasksTrackByPeriod,
  taskTracksDurationGroupByTask,
  taskTracksGroupByTask,
  (tasks, activeProject, taskTracks, durationInfo, taskTracksInfo) => {
    if (!activeProject) {
      return [];
    }
    const activeTasksId = taskTracks
      .filter(({ projectId }) => projectId === activeProject)
      .map(({ taskId }) => taskId);

    return tasks
      .filter(({ id }) => activeTasksId.includes(id))
      .map((task) => ({
        ...task,
        durationInTask: durationInfo[task.id],
        taskTracksInTask: taskTracksInfo[task.id],
      }))
      .sort((a, b) => b.durationInTask - a.durationInTask);
  }
);

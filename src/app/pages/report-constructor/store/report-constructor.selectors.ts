import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReportConstructorState } from './report-constructor.state';

import { getDates } from '../helpers/helpers';

import { StateName } from '@shared/enums/enum';
import {
  getProjects,
  getTasks,
  getTasksTrack,
} from '@store/common/common.selectors';

export const REPORT_CONSTRUCTOR_STATE_NAME = StateName.ReportConstructor;

const getReportConstructorState = createFeatureSelector<ReportConstructorState>(
  REPORT_CONSTRUCTOR_STATE_NAME
);

export const getProject = createSelector(
  getReportConstructorState,
  ({ projectId }) => projectId
);

export const getPeriod = createSelector(
  getReportConstructorState,
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
  getReportConstructorState,
  ({ viewMode }) => viewMode
);

export const getChartViewMode = createSelector(
  getReportConstructorState,
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

export const projectsInfoByProjectId = createSelector(getProjects, (projects) =>
  projects.reduce((accum, project) => ({ ...accum, [project.id]: project }), {})
);

export const getUser = createSelector(
  getReportConstructorState,
  ({ userId }) => userId
);

export const getTaskTracksByUser = createSelector(
  getUser,
  getTasksTrackByPeriod,
  (userId, taskTracks) =>
    taskTracks.filter((taskTrack) => taskTrack.userId === userId)
);

export const taskTracksGroupByDate = createSelector(
  getPeriod,
  getTaskTracksByUser,
  (period, taskTracks) =>
    getDates(period).reduce((accum, date) => {
      const activeTaskTracks = taskTracks.filter(
        (taskTrack) =>
          new Date(taskTrack.date.seconds * 1000).getFullYear() ===
            new Date(date).getFullYear() &&
          new Date(taskTrack.date.seconds * 1000).getMonth() ===
            new Date(date).getMonth() &&
          new Date(taskTrack.date.seconds * 1000).getDate() ===
            new Date(date).getDate()
      );
      return { ...accum, [date]: activeTaskTracks };
    }, {})
);

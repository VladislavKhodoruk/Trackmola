import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashboardState } from './dashboard.state';

import {
  searchName,
  searchProjectColor,
} from '@pages/dashboard/components/active-tasks-list/helpers/search-project-name-color';
import { searchTaskName } from '@pages/dashboard/components/active-tasks-list/helpers/search-task-name';
import { searchUserPhoto } from '@pages/dashboard/components/active-tasks-list/helpers/search-user-photo';

import { PeriodType, StateName, UserType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import {
  getActiveTasks,
  getProjects,
  getTasks,
  getTasksTrack,
  getUsers,
} from '@store/common/common.selectors';

export const DASHBOARD_STATE_NAME = StateName.Dashboard;

const getDashboardState =
  createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);

export const getDashboardPeriod = createSelector(
  getDashboardState,
  ({ period }) => period
);

export const getManagerDashboardPeriod = createSelector(
  getDashboardState,
  ({ manager }) => manager.period
);

export const getTasksTrackByPeriod = createSelector(
  getTasksTrack,
  getManagerDashboardPeriod,
  (taskTracks, period) =>
    taskTracks.filter(
      (taskTrack) =>
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

export const getWeekReportTime = createSelector(
  getTasksTrack,
  getDashboardPeriod,
  (taskTracks, period) =>
    taskTracks
      .filter(
        (taskTrack) =>
          taskTrack.userId === localStorage.getItem('AuthUserId') &&
          taskTrack.date.seconds * 1000 >= period.start &&
          taskTrack.date.seconds * 1000 <= period.end
      )
      .reduce((result, item) => (result += item.duration), 0)
);

export const getWeekActiveTasks = createSelector(
  getTasksTrack,
  getDashboardPeriod,
  (taskTracks, period) =>
    taskTracks.filter(
      (taskTrack) =>
        taskTrack.userId === localStorage.getItem('AuthUserId') &&
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

export const getTaskWithAllParametrs = createSelector(
  getActiveTasks,
  getProjects,
  getTasks,
  getUsers,
  getTasksTrack,
  (active, projects, tasks, users, allTaskTracks) =>
    active.map((i) => ({
      projectColor: searchProjectColor(i.projectId, projects),
      projectName: searchName(i.projectId, projects),
      status: i.status,
      taskName: searchTaskName(i.taskId, tasks),
      usersPhotos: searchUserPhoto(i.taskId, allTaskTracks, users),
    }))
);

export const getManadgersProjects = createSelector(getProjects, (projects) =>
  projects.filter((project) =>
    project.managersId.includes(localStorage.getItem('AuthUserId'))
  )
);

export const getManagerProjectsFilter = createSelector(
  getDashboardState,
  getManadgersProjects,
  ({ manager }, projects) =>
    projects.filter((project) => manager.projectsFilter.includes(project.name))
);

export const getModeView = createSelector(
  getDashboardState,
  ({ manager }) => manager.modeView
);

export const projectInfoByProjectId = createSelector(getProjects, (projects) =>
  projects.reduce((accum, project) => ({ ...accum, [project.id]: project }), {})
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

export const getActiveTask = createSelector(
  getDashboardState,
  ({ manager }) => manager.selectedTask
);

export const getActiveProjectFilter = createSelector(
  getDashboardState,
  ({ manager }) => manager.activeProjectFilter
);

export const getTasksForManager = createSelector(
  getTasks,
  getActiveProjectFilter,
  getTasksTrackByPeriod,
  taskTracksDurationGroupByTask,
  taskTracksGroupByTask,
  (tasks, activeProject, taskTracks, durationInfo, taskTracksInfo) => {
    if (!activeProject) {
      return [];
    }
    const activeTasksId = taskTracks
      .filter(({ projectId }) => projectId === activeProject.id)
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

export const getUsersWithoutAdminCTO = createSelector(getUsers, (users) =>
  users.filter(
    (item) => item.role !== UserType.Admin && item.role !== UserType.CTO
  )
);

export const getTaskTracksByMonth = createSelector(
  getTasksTrack,
  (taskTracks) =>
    taskTracks.filter((taskTrack) => {
      const period = getPeriod(new Date(), PeriodType.Month);
      return (
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
      );
    })
);

export const getTaskTracksDurationGroupByUser = createSelector(
  getUsers,
  getTaskTracksByMonth,
  (users, taskTracks) =>
    users.reduce((accum, user) => {
      const activeTaskTracks = taskTracks.filter(
        ({ userId }) => userId === user.id
      );

      const duration = activeTaskTracks.reduce(
        (result, taskTrack) => (result += taskTrack.duration),
        0
      );

      const overtimeDuration = activeTaskTracks.reduce(
        (result, taskTrack) => (result += taskTrack.overtimeDuration),
        0
      );
      return { ...accum, [user.id]: { duration, overtimeDuration } };
    }, {})
);

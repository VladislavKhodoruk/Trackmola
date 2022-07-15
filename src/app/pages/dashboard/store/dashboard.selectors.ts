import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashboardState } from './dashboard.state';

import {
  searchName,
  searchProjectColor,
} from '@pages/dashboard/components/active-tasks-list/helpers/search-project-name-color';
import { searchTaskName } from '@pages/dashboard/components/active-tasks-list/helpers/search-task-name';
import { searchUserPhoto } from '@pages/dashboard/components/active-tasks-list/helpers/search-user-photo';

import { StateName } from '@shared/enums/enum';
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

export const getWeekReportTime = createSelector(
  getTasksTrack,
  getDashboardPeriod,
  (taskTracks, period) =>
    taskTracks
      .filter(
        (taskTrack) =>
          taskTrack.userId === localStorage.getItem('AuthUserId') &&
          taskTrack.date.seconds * 1000 > period.start &&
          taskTrack.date.seconds * 1000 < period.end
      )
      .reduce((result, item) => (result += item.duration), 0)
);

export const getTaskWithAllParametrs = createSelector(
  getActiveTasks,
  getProjects,
  getTasks,
  getUsers,
  getTasksTrack,
  (active, projects, tasks, users, allTaskTracks) =>
    active.map((i) => ({
      projectName: searchName(i.projectId, projects),
      projectColor: searchProjectColor(i.projectId, projects),
      taskName: searchTaskName(i.taskId, tasks),
      status: i.status,
      usersPhotos: searchUserPhoto(i.taskId, allTaskTracks, users),
    }))
);

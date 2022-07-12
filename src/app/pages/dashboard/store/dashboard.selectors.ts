import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { DashboardState } from './dashboard.state';
import {
  getActiveTasks,
  getProjects,
  getTasks,
  getTasksTrack,
  getUsers,
} from '@store/common/common.selectors';
import {
  searchName,
  searchProjectColor,
} from '@pages/dashboard/components/active-tasks-list/helpers/search-project-name-color';
import { SearchTaskName } from '@pages/dashboard/components/active-tasks-list/helpers/search-task-name';
import { SearchUserPhoto } from '@pages/dashboard/components/active-tasks-list/helpers/search-user-photo';

export const DASHBOARD_STATE_NAME = StateName.Dashboard;

const getDashboardState =
  createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);

export const getWeekReportTime = createSelector(
  getDashboardState,
  ({ weekReportTime }) => weekReportTime
);

export const getTaskWithAllParametrs = createSelector(
  getActiveTasks,
  getProjects,
  getTasks,
  getUsers,
  getTasksTrack,
  (active, projects, tasks, users, allTaskTracks) => {
    return active.map((i) => ({
      projectName: searchName(i.projectId, projects),
      projectColor: searchProjectColor(i.projectId, projects),
      taskName: SearchTaskName(i.taskId, tasks),
      status: i.status,
      usersPhotos: SearchUserPhoto(i.taskId, allTaskTracks, users),
    }));
  }
);

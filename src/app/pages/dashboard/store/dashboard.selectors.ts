import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateName } from '@shared/enums/enum';
import { DashboardState } from './dashboard.state';
import {
  searchName,
  searchProjectColor
} from "@pages/dashboard/components/active-tasks-list/helpers/search-Project-Name";
import { SearchTaskName } from "@pages/dashboard/components/active-tasks-list/helpers/search-Task-Name";
import { ActiveTasks } from "@shared/interfaces/interfaces";
import { SearchUserPhoto } from "@pages/dashboard/components/active-tasks-list/helpers/search-User-Photo";

export const DASHBOARD_STATE_NAME = StateName.Dashboard;

const getDashboardState =
  createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);

export const getWeekReportTime = createSelector(
  getDashboardState,
  ({ weekReportTime }) => weekReportTime
);

export const getAllProjectsSelector = createSelector(
  getDashboardState,
  ({ allProjects }) => allProjects
);

export const getAllTasksSelector = createSelector(
  getDashboardState,
  ({ allTasks }) => allTasks
);

export const getAllUsersSelector = createSelector(
  getDashboardState,
  ({ allUsers }) => allUsers
);

export const getAllActiveTasks = createSelector(
  getDashboardState,
  ({ activeTasks }) => activeTasks
);

export const getAllTaskTracks = createSelector(
  getDashboardState,
  ({ allTaskTracks }) => allTaskTracks
);

export const getTaskWithAllParametrs = createSelector(
  getAllActiveTasks,
  getAllProjectsSelector,
  getAllTasksSelector,
  getAllUsersSelector,
  getAllTaskTracks,
  (active, projects, tasks, users, allTaskTracks) => {
    const fullTask = active.map((i) => ({
      projectName: searchName(i.projectId, projects),
      projectColor: searchProjectColor(i.projectId, projects),
      taskName: SearchTaskName(i.taskId, tasks),
      status: i.status,
      usersPhotos: SearchUserPhoto(i.taskId, allTaskTracks, users),
    }));
    return fullTask;
  }
);

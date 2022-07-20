import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectsState } from './projects.state';

import { StateName } from '@shared/enums/enum';
import {
  getPeriod,
  getProjects,
  getTasks,
  getTasksTrack,
  getUsers,
} from '@store/common/common.selectors';
import { RouterStateUrl } from '@store/router/custom-serializer';
import { getCurrentRoute } from '@store/router/router.selector';

export const PROJECTS_STATE_NAME = StateName.Projects;

const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_STATE_NAME);

export const getSearchValue = createSelector(
  getProjectsState,
  ({ searchValue }) => searchValue
);

export const usersInfoByUserId = createSelector(getUsers, (users) =>
  users.reduce((accum, user) => ({ ...accum, [user.id]: user }), {})
);

export const getProjectByRoute = createSelector(
  getProjects,
  getCurrentRoute,
  (projects, route: RouterStateUrl) =>
    projects.find((project) => project.name.toLowerCase() === route.params.name)
);

export const filteredTaskTracksByPeriod = createSelector(
  getTasksTrack,
  getPeriod,
  (taskTracks, period) =>
    taskTracks.filter(({ date }) => {
      const startDate = period.start;
      const endDate = period.end;
      return date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate;
    })
);

export const activeTaskGroupByProject = createSelector(
  getTasks,
  getProjects,
  filteredTaskTracksByPeriod,
  (tasks, projects, taskTracks) =>
    projects.reduce((accum, project) => {
      const activeTasksId = taskTracks
        .filter(({ projectId }) => projectId === project.id)
        .map(({ taskId }) => taskId);

      const activeTasks = tasks.filter(({ id }) => activeTasksId.includes(id));

      return { ...accum, [project.id]: activeTasks };
    }, {})
);

export const activeUserGroupByProject = createSelector(
  getUsers,
  getProjects,
  filteredTaskTracksByPeriod,
  (users, projects, taskTracks) =>
    projects.reduce((accum, project) => {
      const activeUsersId = taskTracks
        .filter(({ projectId }) => projectId === project.id)
        .map(({ taskId }) => taskId);

      const activeUsers = users.filter(({ id }) => activeUsersId.includes(id));

      return { ...accum, [project.id]: activeUsers };
    }, {})
);

export const usersGroupByProject = createSelector(
  filteredTaskTracksByPeriod,
  getProjects,
  getUsers,
  (taskTracks, projects, users) =>
    projects.reduce((acum, project) => {
      const usersInTaskTracks = taskTracks
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .filter(({ projectId }) => projectId === project.id)
        .map(({ userId }) => userId);

      const filteredUsers = users.filter(({ id }) =>
        usersInTaskTracks.includes(id)
      );

      return {
        ...acum,
        [project.id]: filteredUsers,
      };
    }, {})
);

export const activeTaskTracksGroupByTask = createSelector(
  getTasks,
  filteredTaskTracksByPeriod,
  (tasks, taskTracks) =>
    tasks.reduce((accum, task) => {
      const activeTasks = taskTracks.filter(({ taskId }) => taskId === task.id);
      return { ...accum, [task.id]: activeTasks };
    }, {})
);

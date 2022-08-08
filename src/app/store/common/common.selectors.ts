import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonState } from './common.state';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';
import { StateName } from '@shared/enums/enum';

const getCommonState = createFeatureSelector<CommonState>(StateName.Common);

export const getLoading = createSelector(
  getCommonState,
  (state) => state.loadingStatus.loading
);

export const getErrorMessage = createSelector(
  getCommonState,
  (state) => state.loadingStatus.errorMessage
);

export const getPeriod = createSelector(
  getCommonState,
  (state) => state.period
);

export const getUser = createSelector(getCommonState, (state) => state.user);

export const getUsers = createSelector(getCommonState, (state) => state.users);

export const getFirstDay = createSelector(getPeriod, (period) => period.start);

export const getLastDay = createSelector(getPeriod, (period) => period.end);

export const getDate = createSelector(getCommonState, (state) => state.date);

export const getVacations = createSelector(
  getCommonState,
  (state) => state.vacations
);

export const getTasksTrack = createSelector(
  getCommonState,
  ({ taskTracks }) => taskTracks
);

export const getTasks = createSelector(getCommonState, ({ tasks }) => tasks);

export const getProjects = createSelector(
  getCommonState,
  ({ projects }) => projects
);

export const getTasksTrackByPeriod = createSelector(
  getTasksTrack,
  getPeriod,
  (taskTracks, period) =>
    taskTracks.filter(
      (taskTrack) =>
        taskTrack.userId === localStorage.getItem('AuthUserId') &&
        taskTrack.date.seconds * 1000 >= period.start - ONE_WEEK_IN_SECONDS &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

export const getActiveTasks = createSelector(getTasksTrackByPeriod, (tasks) =>
  tasks.filter((item) => item.status === 'in progress' || item.status === '')
);

export const usersInfoByUserId = createSelector(getUsers, (users) =>
  users.reduce((accum, user) => ({ ...accum, [user.id]: user }), {})
);
export const getLocations = createSelector(getUsers, (users) =>
  users.forEach((user) => user.location)
);

export const projectsByUsers = createSelector(
  getTasksTrack,
  getProjects,
  getUsers,
  (taskTracks, projects, users) =>
    users.reduce((acum, user) => {
      const projectsInTaskTracks = taskTracks
        .filter(({ userId }) => userId === user.id)
        .map(({ projectId }) => projectId);

      const filteredProjects = projects.filter(({ id }) =>
        projectsInTaskTracks.includes(id)
      );

      return {
        ...acum,
        [user.id]: filteredProjects,
      };
    }, {})
);

export const locations = createSelector(getUsers, (users) => {
  const allLocations = users.map((user) => user.location);
  const uniqLocations = [...new Set(allLocations)];
  return uniqLocations;
});

export const positions = createSelector(getUsers, (users) => {
  const allPositions = users.map((user) => user.position);
  const uniqPositions = [...new Set(allPositions)];
  return uniqPositions;
});

export const trackedTimeByProjects = createSelector(
  getTasksTrack,
  getProjects,
  (taskTracks, projects) =>
    projects.reduce((acum, project) => {
      const taskTracksInProjects = taskTracks.filter(
        ({ projectId }) => projectId === project.id
      );
      const trackedTime = taskTracksInProjects.reduce(
        (acc, tasktrack) => acc + tasktrack.duration,
        0
      );
      return {
        ...acum,
        [project.id]: trackedTime,
      };
    }, {})
);

export const getCurrentVacations = createSelector(getVacations, (vacations) =>
  vacations.filter(
    (vacation) => vacation.userId === localStorage.getItem('AuthUserId')
  )
);

export const filteredTaskTracksByPeriod1 = createSelector(
  getTasksTrack,
  getPeriod,
  (taskTracks, period) =>
    taskTracks.filter(({ date }) => {
      const startDate = period.start;
      const endDate = period.end;
      return date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate;
    })
);

export const usersGroupByProject = createSelector(
  filteredTaskTracksByPeriod1,
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

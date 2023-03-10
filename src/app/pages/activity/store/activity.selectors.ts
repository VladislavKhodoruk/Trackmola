import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ActivityState } from './activity.state';

import { StateName } from '@shared/enums/enum';
import { getProjects, getTasksTrack } from '@store/common/common.selectors';

export const ACTIVITY_STATE_NAME = StateName.Activity;

const getActivityState =
  createFeatureSelector<ActivityState>(ACTIVITY_STATE_NAME);

export const getActivityPeriod = createSelector(
  getActivityState,
  ({ period }) => period
);

export const getReportTime = createSelector(
  getTasksTrack,
  getActivityPeriod,
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

export const getReportOvertime = createSelector(
  getTasksTrack,
  getActivityPeriod,
  (taskTracks, period) =>
    taskTracks
      .filter(
        (taskTrack) =>
          taskTrack.userId === localStorage.getItem('AuthUserId') &&
          taskTrack.date.seconds * 1000 > period.start &&
          taskTrack.date.seconds * 1000 < period.end
      )
      .reduce((result, item) => (result += item.overtimeDuration), 0)
);

export const getActivePeriod = createSelector(
  getActivityState,
  ({ choosePeriod }) => choosePeriod
);

export const getMyActivityTaskTracks = createSelector(
  getTasksTrack,
  getActivityPeriod,
  (tasksTracks, period) =>
    tasksTracks.filter(
      (taskTrack) =>
        taskTrack.userId === localStorage.getItem('AuthUserId') &&
        taskTrack.date.seconds * 1000 >= period.start &&
        taskTrack.date.seconds * 1000 <= period.end
    )
);

export const getMyActivityProjects = createSelector(
  getMyActivityTaskTracks,
  getProjects,
  (activityTaskTracks, projects) => {
    const activityProjectsId = activityTaskTracks.map(
      (taskTrack) => taskTrack.projectId
    );
    return projects.filter((project) =>
      activityProjectsId.includes(project.id)
    );
  }
);

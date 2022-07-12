import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateName } from '@shared/enums/enum';
import { getProjects, getTasksTrack } from '@store/common/common.selectors';
import { ActivityState } from './activity.state';

export const ACTIVITY_STATE_NAME = StateName.Activity;

const getActivityState =
  createFeatureSelector<ActivityState>(ACTIVITY_STATE_NAME);

export const getWeekReportTime = createSelector(
  getActivityState,
  ({ weekReportTime }) => weekReportTime
);

export const getActivityPeriod = createSelector(
  getActivityState,
  ({ period }) => period
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
    const activityProjecstId = activityTaskTracks.map(
      (taskTrack) => taskTrack.projectId
    );
    return projects.filter((project) =>
      activityProjecstId.includes(project.id)
    );
  }
);

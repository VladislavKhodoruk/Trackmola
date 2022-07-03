import { Action, createReducer, on } from '@ngrx/store';
import {
  getActivityProjectsSuccess,
  getActivityTasksSuccess,
} from './activity.actions';
import { ActivityState, activityState } from './activity.state';

const activityReducer = createReducer(
  activityState,
  on(getActivityTasksSuccess, (state: ActivityState, action) => ({
    ...state,
    tasks: action.tasks,
  })),
  on(getActivityProjectsSuccess, (state: ActivityState, action) => ({
    ...state,
    projects: action.projects,
  }))
);

export function ActivityReducer(state: ActivityState, action: Action) {
  return activityReducer(state, action);
}

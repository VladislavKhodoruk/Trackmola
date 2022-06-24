import { Action, createReducer } from '@ngrx/store';
import { ActivityState, activityState } from './activity.state';

const activityReducer = createReducer(activityState);

export function ActivityReducer(state: ActivityState, action: Action) {
  return activityReducer(state, action);
}

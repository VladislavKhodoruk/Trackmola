import { createAction, props } from '@ngrx/store';
import { Period } from '@shared/interfaces/interfaces';

export const SET_PERIOD = 'set period';
export const SET_PROJECT = 'set project';

export const setPeriod = createAction(SET_PERIOD, props<{ period: Period }>());

export const setProject = createAction(
  SET_PROJECT,
  props<{ projectId: string }>()
);

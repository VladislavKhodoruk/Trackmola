import { createAction, props } from '@ngrx/store';

import { ExcelData } from '../interfaces/interfaces';

import { Period } from '@shared/interfaces/interfaces';

export const SET_PERIOD = '[report-constructor page]set period';
export const SET_PROJECT = '[report-constructor page] set project';
export const EXPORT_EXEL = '[report-constructor page] export exel';

export const setPeriod = createAction(SET_PERIOD, props<{ period: Period }>());

export const setProject = createAction(
  SET_PROJECT,
  props<{ projectId: string }>()
);

export const exportExel = createAction(
  EXPORT_EXEL,
  props<{ data: ExcelData }>()
);

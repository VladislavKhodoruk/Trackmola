import { createAction, props } from '@ngrx/store';

import { ExcelData } from '../interfaces/interfaces';

import { ChartViewMode, ViewMode } from '@pages/report/enums/enum';
import { Period } from '@shared/interfaces/interfaces';

export const SET_PERIOD = '[report-constructor page]set period';
export const SET_PROJECT = '[report-constructor page] set project';
export const EXPORT_EXEL = '[report-constructor page] export exel';
export const CHANGE_VIEW_MODE = '[report-constructor page] change view mode';
export const CHANGE_CHART_VIEW_MODE =
  '[report-constructor page] change chart view mode';

export const setPeriod = createAction(SET_PERIOD, props<{ period: Period }>());

export const setProject = createAction(
  SET_PROJECT,
  props<{ projectId: string }>()
);

export const setUser = createAction(SET_PROJECT, props<{ userId: string }>());

export const exportExel = createAction(
  EXPORT_EXEL,
  props<{ data: ExcelData }>()
);

export const changeViewMode = createAction(
  CHANGE_VIEW_MODE,
  props<{ viewMode: ViewMode }>()
);

export const changeChartViewMode = createAction(
  CHANGE_CHART_VIEW_MODE,
  props<{ chartViewMode: ChartViewMode }>()
);

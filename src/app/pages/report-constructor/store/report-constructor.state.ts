import { ChartViewMode, ViewMode } from './../../report/enums/enum';

import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ReportConstructorState {
  period: Period;
  projectId?: string;
  viewMode: ViewMode;
  chartViewMode: ChartViewMode;
}

export const reportConstructorState: ReportConstructorState = {
  chartViewMode: ChartViewMode.Table,
  period: getPeriod(new Date(), PeriodType.Week),
  viewMode: ViewMode.Table,
};

import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ActivityState {
  period: Period;
  weekReportTime: number;
  choosePeriod: string;
}

export const activityState: ActivityState = {
  period: getPeriod(new Date(), PeriodType.Week),
  weekReportTime: 0,
  choosePeriod: PeriodType.Week,
};

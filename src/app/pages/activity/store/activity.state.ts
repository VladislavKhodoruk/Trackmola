import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ActivityState {
  period: Period;
  choosePeriod: PeriodType;
}

export const activityState: ActivityState = {
  choosePeriod: PeriodType.Week,
  period: getPeriod(new Date(), PeriodType.Week),
};

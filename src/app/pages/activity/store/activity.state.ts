import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ActivityState {
  period: Period;
  weekReportTime: number;
}

export const activityState: ActivityState = {
  period: getPeriod(new Date(), 'week'),
  weekReportTime: 0,
};

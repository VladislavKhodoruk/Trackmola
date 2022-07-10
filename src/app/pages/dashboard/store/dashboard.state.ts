import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface DashboardState {
  period: Period;
  weekReportTime: number;
}

export const dashboardState: DashboardState = {
  weekReportTime: 0,
  period: getPeriod(new Date(), 'week'),
};

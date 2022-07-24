import { Project, Period } from './../../../shared/interfaces/interfaces';

import { ManagerDashboardView } from '../enums/enum';

import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';

interface DashboardManagerState {
  projectsFilter: Project['name'][];
  modeView: ManagerDashboardView;
}

export interface DashboardState {
  period: Period;
  weekReportTime: number;
  manager: DashboardManagerState;
}

export const dashboardState: DashboardState = {
  weekReportTime: 0,
  period: getPeriod(new Date(), PeriodType.Week),
  manager: {
    projectsFilter: ['dataMill', 'Education', 'TrackMola'],
    modeView: ManagerDashboardView.Table,
  },
};

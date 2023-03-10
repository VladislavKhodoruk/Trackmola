import { Project, Period } from './../../../shared/interfaces/interfaces';

import { ManagerDashboardView } from '../enums/enum';

import { PeriodType, UserType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';

interface DashboardManagerState {
  projectsFilter: Project['name'][];
  activeProjectFilter: Project | null;
  modeView: ManagerDashboardView;
  period: Period;
}

export interface DashboardState {
  period: Period;
  weekReportTime: number;
  manager: DashboardManagerState;
  dashboardView: UserType | null;
}

export const dashboardState: DashboardState = {
  dashboardView: null,
  manager: {
    activeProjectFilter: null,
    modeView: ManagerDashboardView.Table,
    period: getPeriod(new Date(), PeriodType.TwoWeek),
    projectsFilter: [],
  },
  period: getPeriod(new Date(), PeriodType.Week),
  weekReportTime: 0,
};

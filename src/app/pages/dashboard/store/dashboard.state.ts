import { Project, Period } from './../../../shared/interfaces/interfaces';

import { ManagerDashboardView } from '../enums/enum';

import { TaskForManager } from '../interfaces/interface';

import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';

interface DashboardManagerState {
  projectsFilter: Project['name'][];
  modeView: ManagerDashboardView;
  selectedTask?: TaskForManager;
}

export interface DashboardState {
  period: Period;
  weekReportTime: number;
  manager: DashboardManagerState;
}

export const dashboardState: DashboardState = {
  manager: {
    modeView: ManagerDashboardView.Table,
    projectsFilter: [],
  },
  period: getPeriod(new Date(), PeriodType.Week),
  weekReportTime: 0,
};

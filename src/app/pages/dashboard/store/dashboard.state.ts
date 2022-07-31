import { Project, Period } from './../../../shared/interfaces/interfaces';

import { ManagerDashboardView } from '../enums/enum';

import { TaskForManager } from '../interfaces/interface';

import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';

interface DashboardManagerState {
  projectsFilter: Project['name'][];
  activeProjectFilter: Project | null;
  modeView: ManagerDashboardView;
  selectedTask: TaskForManager | null;
  period: Period;
}

export interface DashboardState {
  period: Period;
  weekReportTime: number;
  manager: DashboardManagerState;
}

export const dashboardState: DashboardState = {
  manager: {
    activeProjectFilter: null,
    modeView: ManagerDashboardView.Table,
    period: getPeriod(new Date(), PeriodType.TwoWeek),
    projectsFilter: [],
    selectedTask: null,
  },
  period: getPeriod(new Date(), PeriodType.Week),
  weekReportTime: 0,
};

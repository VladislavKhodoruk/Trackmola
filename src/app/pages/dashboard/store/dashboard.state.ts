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
}

export interface DashboardState {
  period: Period;
  weekReportTime: number;
  manager: DashboardManagerState;
}

export const dashboardState: DashboardState = {
  manager: {
    activeProjectFilter: {
      color: '#CD59B1',
      description: 'Application for tracking work hours and managing projects.',
      fullName: 'TrackMola application',
      id: 'pdCsdrXhodWnZieCfp6O',
      managersId: [
        'mocfzWIHXuYiYbefQMTclEotJr83',
        'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
      ],
      name: 'TrackMola',
      tasksId: [
        '0N9SBvw8R48Ybb1rw3T4',
        '33vqSse9t7ZBt7L9dU4E',
        '7RSD0NbwupaS9X02TNZw',
        '8K3meYpeXrGzpGjnJPnR',
        '8NVvNqnhPXLdvtQOBaU9',
        'DAbIvkXwQTpwc2fSTCyj',
        'EtmWicPcMobMNnSAsbRT',
        'FwXyPX0Ffi17hAmggPFA',
        'Hc4YbEPzpiifROv5sa8O',
        'QKjSwPFnjttXhANdb3ym',
        'QY81kEvbTr0SbeUXnAgg',
        'TDIUIUOVf4jeIG9mAR3W',
        'UWaVlIkICl5i9pAG7bk6',
        'XgtweOoksn6fBDSE8i04',
        'biTabiSBOm6oIEgtTeXb',
        'f0gIlkC9lXqjC8gWcYV3',
        'gE62UaYK4O1ANmriuPrV',
        'gkHHSsV3n1eKiqqDZe27',
        'hn5F9D4QrvTMmFK7sxmB',
        'ns3AEnKBPZba136yvRlX',
        'pr0QyzdmBmfo2gIdkQ0l',
        'qrrUL82KfjnzFWEIToEH',
        'v0LbADWIFPqFSKM6EuMr',
        'wwwKItkbi4XLCeph58X6',
        'xBgaMXjSCTN8snri41dW',
        'jxO5Sd5l9PHnifQyKun8',
      ],
    },
    modeView: ManagerDashboardView.Arrows,
    projectsFilter: ['TrackMola'],
    selectedTask: null,
  },
  period: getPeriod(new Date(), PeriodType.Week),
  weekReportTime: 0,
};

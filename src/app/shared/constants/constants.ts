import chartDonut3 from '@iconify/icons-tabler/chart-donut-3';
import fileTime from '@iconify/icons-tabler/file-time';
import layoutDashboard from '@iconify/icons-tabler/layout-dashboard';
import puzzleIcon from '@iconify/icons-tabler/puzzle';
import { UserType } from '@shared/enums/enum';
import { NavigationItem } from '@shared/interfaces/interfaces';

const NAVIGATION_BASIC_ITEMS: NavigationItem[] = [
  {
    routeLink: 'dashboard',
    icon: layoutDashboard,
    label: 'Dashboard',
  },
  {
    routeLink: 'report',
    icon: fileTime,
    label: 'My report',
  },
  {
    routeLink: 'activity',
    icon: chartDonut3,
    label: 'My activity',
  },
  {
    routeLink: 'projects',
    icon: puzzleIcon,
    label: 'Projects',
  },
];

const NAVIGATION_TEAM: NavigationItem = {
  routeLink: 'team',
  icon: puzzleIcon,
  label: 'Team',
};

export const getNavigationElems = (userType: string): NavigationItem[] => {
  switch (userType) {
    case UserType.Employee:
      return NAVIGATION_BASIC_ITEMS;
    case UserType.CTO:
      return [...NAVIGATION_BASIC_ITEMS, NAVIGATION_TEAM];
    case UserType.Manager:
      return [...NAVIGATION_BASIC_ITEMS, NAVIGATION_TEAM];
    case UserType.Admin:
      return [...NAVIGATION_BASIC_ITEMS, NAVIGATION_TEAM];
  }
};

export const DEFAULT_PHOTO_URL = 'assets/img/user.png';

export const ONE_DAY_IN_SECONDS = 86400000;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;

export const NAMES_OF_THE_DAYS_OF_THE_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const ONE_DIVISION_CALENDAR_BAR = 0.7;

export const MAXIMUM_VALUE_BAR = 5.625;

export const NUMBER_OF_DAYS_IN_A_WEEK = 7;

export const MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY = 8;

export const CLASS_DURATION_MORE_THAN_EIGHT = 'more';
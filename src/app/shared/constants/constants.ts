import chartDonut3 from '@iconify/icons-tabler/chart-donut-3';
import fileTime from '@iconify/icons-tabler/file-time';
import layoutDashboard from '@iconify/icons-tabler/layout-dashboard';
import manualGearbox from '@iconify/icons-tabler/manual-gearbox';
import puzzleIcon from '@iconify/icons-tabler/puzzle';

import { UserType } from '@shared/enums/enum';
import { NavigationItem } from '@shared/interfaces/interfaces';

const NAVIGATION_BASIC_ITEMS: NavigationItem[] = [
  {
    icon: layoutDashboard,
    label: 'Dashboard',
    routeLink: 'dashboard',
  },
  {
    icon: fileTime,
    label: 'My report',
    routeLink: 'report',
  },
  {
    icon: chartDonut3,
    label: 'My activity',
    routeLink: 'activity',
  },
  {
    icon: puzzleIcon,
    label: 'Projects',
    routeLink: 'projects',
  },
];

const NAVIGATION_MANAGER_ITEMS: NavigationItem[] = [
  ...NAVIGATION_BASIC_ITEMS,
  {
    icon: puzzleIcon,
    label: 'Team',
    routeLink: 'team',
  },
  {
    icon: manualGearbox,
    label: 'Report constructor',
    routeLink: 'report-constructor',
  },
];

export const getNavigationElems = (userType: string): NavigationItem[] =>
  userType === UserType.Employee
    ? NAVIGATION_BASIC_ITEMS
    : NAVIGATION_MANAGER_ITEMS;

export const DEFAULT_PHOTO_URL = 'assets/img/user.png';
export const MAX_USERS_PHOTO = 4;
export const ONE_DAY_IN_SECONDS = 86400000;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7;
export const ONE_MONTH_IN_SECONDS = ONE_WEEK_IN_SECONDS * 4;
export const DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK = 40;

export const NAMES_OF_THE_DAYS_OF_THE_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const SHORT_NAMES_OF_THE_WEEK_UPPERCASE =
  NAMES_OF_THE_DAYS_OF_THE_WEEK.map((i) => i.slice(0, 3).toUpperCase());

export const ONE_DIVISION_CALENDAR_BAR = 0.7;

export const MAXIMUM_VALUE_BAR = 5.625;

export const NUMBER_OF_DAYS_IN_A_WEEK = 7;

export const MAXIMUM_NUMBER_OF_HOURS_IN_A_DAY = 8;

export const CLASS_DURATION_MORE_THAN_EIGHT = 'more';

export const dialogOpeningTime = '300ms';

export const CHAR_CREATE_COLOR = '0123456789ABCDEF';

export const NUMBER_CHAR_CREATE_COLOR = 6;

export const COLORS_FOR_TASKS = [
  'var(--task-violet)',
  'var(--task-marine)',
  'var(--task-sea)',
  'var(--task-violet2)',
  'var(--task-marine2)',
  'var(--task-sea2)',
  'var(--task-flover)',
  'var(--task-roses)',
  'var(--task-landscape)',
  'var(--task-salad)',
  'var(--task-lips)',
  'var(--task-peche)',
  'var(--task-salad2)',
  'var(--task-violet3)',
];

export const OUTPUT_RATE = 8;
export const HIGHEST_KPI = 1;

export const ROLES = ['employee', 'manager', 'admin', 'CTO'];

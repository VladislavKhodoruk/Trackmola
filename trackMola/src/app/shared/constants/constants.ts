import layoutDashboard from '@iconify/icons-tabler/layout-dashboard';
import chartDonut3 from '@iconify/icons-tabler/chart-donut-3';
import fileTime from '@iconify/icons-tabler/file-time';
import puzzleIcon from '@iconify/icons-tabler/puzzle';

export const navigationItems = [
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

export const defaultPhotoUrl = 'assets/img/user.png';

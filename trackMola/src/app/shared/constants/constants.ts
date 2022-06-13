import {
  faCalendarDays,
  faDiagramProject,
  faPieChart,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

export const navigationItems = [
  {
    routeLink: 'dashboard',
    icon: faTableColumns,
    label: 'Dashboard',
  },
  {
    routeLink: 'report',
    icon: faCalendarDays,
    label: 'My report',
  },
  {
    routeLink: 'projects',
    icon: faDiagramProject,
    label: 'Projects',
  },
  {
    routeLink: 'activity',
    icon: faPieChart,
    label: 'My activity',
  },
];

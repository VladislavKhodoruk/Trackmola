import { IconifyIcon } from '@iconify/types';

export interface ProfileUser {
  type: string;
  name: string;
  photo: string;
  email: string;
  position: string;
  location: string;
  qualification: string;
  rate: string;
  startDate: Date;
}

export interface NavigationItem {
  routeLink: string;
  icon: IconifyIcon;
  label: string;
}

export interface Day {
  value: Date;
  isTasks: boolean;
  duration: number;
}

export interface Week {
  days: Day[];
}

export interface FirstAndLastDayOfWeek {
  [key: string]: Date;
}

export interface Project {
  id: string;
  name: string;
  fullName: string;
  manager: string;
  team: string[];
  description: string;
}

import { IconifyIcon } from '@iconify/types';

export interface ProfileUser {
  id: string;
  email: string;
  location: string;
  birthday: Date;
  fullName: string;
  photo: string;
  position: string;
  qualification: string;
  role: string;
  startDate: Date;
  timeZone: string;
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

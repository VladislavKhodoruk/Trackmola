import { Timestamp } from 'firebase/firestore';
import { IconifyIcon } from '@iconify/types';

export interface Project {
  id: string;
  color: string;
  description: string;
  fullName: string;
  managersId: string[];
  name: string;
  taskId: string[];
}

export interface Task {
  id: string;
  archived: boolean;
  name: string;
  projectId: string;
}

export interface TaskTrack {
  comments: string;
  date: Timestamp;
  duration: number;
  id?: string;
  projectId: string;
  status: string;
  taskId: string;
  userId: string;
}

export interface User {
  birthday: Timestamp;
  email: string;
  fullName: string;
  id: string;
  location: string;
  photo: string;
  position: string;
  qualification: string;
  role: string;
  startDate: Timestamp;
  timeZone: string;
}

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
  value: number;
  isTasks: boolean;
  duration: number;
}

export interface Week {
  days: Day[];
}

export interface Period {
  start: number;
  end: number;
}

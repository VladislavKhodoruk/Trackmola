import { IconifyIcon } from '@iconify/types';

import { Timestamp } from 'firebase/firestore';

import { DayType, WeekDays } from '@shared/enums/enum';

export interface Project {
  id: string;
  color: string;
  description: string;
  fullName: string;
  managersId: string[];
  name: string;
  tasksId: string[];
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
  id: string;
  overtime?: boolean;
  overtimeDuration?: number;
  projectId: string;
  status: string;
  taskId: string;
  taskTrackStatus: string;
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
  overtimeDuration: number;
}

export interface Week {
  days: Day[];
}

export interface Period {
  start: number;
  end: number;
}

export interface TaskItem {
  id: string;
  duration: number;
  overtimeDuration: number;
  taskName: string;
  projectColor: string;
  projectName: string;
}

export interface SelectOptions {
  value: string;
  viewValue: string;
}
export interface ActiveTasks {
  projectName: string;
  projectColor: string;
  taskName: string;
  status: string | null;
  date?: Date;
  usersPhotos: string[];
}

export interface GroupBy<T> {
  [key: string]: T;
}

export interface Vacations {
  vacationDay: Date;
  fullName: string;
  photo: string;
}

export interface UserCard {
  userName: string;
  projects: Project[];
  location: string;
  position: string;
  photo: string;
}

export interface CalendarDay {
  date: string;
  dayType: DayType;
  holidayName?: string;
}

export interface OutOfMain {
  overtimes: number;
  shortages: number;
  working: number;
}

export type TaskByWeekDays = {
  [key in WeekDays]: TaskTrack[] | [];
};

import { Period, Task, TaskTrack, User } from '@shared/interfaces/interfaces';

export interface TaskForManager extends Task {
  durationInTask: number;
  taskTracksInTask: TaskTrack[];
}

export interface DataForChartTreemap {
  id: User['id'];
  name: User['fullName'];
  value: number;
}

export interface DataForChartXRange {
  color: string;
  custom: {
    duration: number;
    userName: User['fullName'];
    userPhoto: User['photo'];
  };
  x: number;
  x2: number;
  y: number;
}

export interface XRangeConfig {
  marginRight: number;
  height: number;
  width: number;
  period: Period;
  weekDays: DaysByPeriod['weekends'];
}

export interface DaysByPeriod {
  days: number[];
  weekends: { from: number; to: number; color?: string }[];
}

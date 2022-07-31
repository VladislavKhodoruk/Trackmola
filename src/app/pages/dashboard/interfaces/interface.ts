import { Task, TaskTrack, User } from '@shared/interfaces/interfaces';

export interface TaskForManager extends Task {
  durationInTask: number;
  taskTracksInTask: TaskTrack[];
}

export interface DataForChartTreemap {
  color: string;
  id: User['id'];
  name: User['fullName'];
  value: number;
}

export interface DataForChartXRange {
  custom: {
    duration: number;
    userName: User['fullName'];
    userPhoto: User['photo'];
  };
  x: number;
  x2: number;
  y: number;
}

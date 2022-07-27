import { Task, TaskTrack } from '@shared/interfaces/interfaces';

export interface TaskForManager extends Task {
  durationInTask: number;
  taskTracksInTask: TaskTrack[];
}

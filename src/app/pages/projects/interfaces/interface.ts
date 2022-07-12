import { TaskTrack, Task, User } from '@shared/interfaces/interfaces';

export interface TaskTrackskGroupByDate {
  [key: string]: TaskTrack[];
}

export interface UsersGroupByProject {
  [key: string]: User[];
}

export interface TaskGroupByProject {
  [key: string]: Task[];
}

export interface TaskTracksGroupByTask {
  [key: string]: TaskTrack[];
}

export interface UsersGroupByUserId {
  [key: string]: User;
}

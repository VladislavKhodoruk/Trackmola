import { TaskTrack, Task, User } from '@shared/interfaces/interfaces';

export interface TaskTrackWithUserInfo extends TaskTrack {
  userInfo: User;
}

export interface TaskTrackskGroupByDate {
  [key: string]: TaskTrackWithUserInfo[];
}

export interface UsersGroupByProject {
  [key: string]: User[];
}

export interface TaskGroupByProject {
  [key: string]: Task[];
}

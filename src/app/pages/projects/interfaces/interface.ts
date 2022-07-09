import { TaskTrack, User } from '@shared/interfaces/interfaces';

export interface TaskTrackWithUserInfo extends TaskTrack {
  userInfo: User;
}

export interface TaskTrackskGroupByDate {
  [key: string]: TaskTrackWithUserInfo[];
}

import { setMidnightTime } from '@shared/helpers/helpers';
import {
  FirstAndLastDayOfWeek,
  ProfileUser,
} from '@shared/interfaces/interfaces';
import { Timestamp } from 'firebase/firestore';

export interface SharedState {
  loadingStatus: LoadingStatus;
  user: ProfileUser | null;
  date: Date;
  tasks: TaskTrack[];
  firstAndLastDayOfWeek?: FirstAndLastDayOfWeek;
}

export interface LoadingStatus {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

export interface TaskTrack {
  id?: string;
  projectId: string;
  date: Timestamp;
  taskId: string;
  duration: number;
  userId?: string;
  comments?: string;
  status?: string;
}

export const initialState: SharedState = {
  loadingStatus: {
    loading: false,
    loaded: false,
    errorMessage: '',
  },
  user: null,
  date: setMidnightTime(new Date()),
  tasks: [],
};

import { setMidnightTime } from '@shared/helpers/helpers';
import {
  FirstAndLastDayOfWeek,
  ProfileUser,
  Project,
} from '@shared/interfaces/interfaces';

export interface SharedState {
  loadingStatus: LoadingStatus;
  user: ProfileUser | null;
  date: Date;
  tasks: TaskTrack[];
  firstAndLastDayOfWeek?: FirstAndLastDayOfWeek;
  projects?: Project[];
}

export interface LoadingStatus {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

export interface TaskTrack {
  projectId: string;
  date: Date;
  comments?: string;
  duration?: number;
  status?: string;
  id?: string;
  taskId?: string;
  userId?: string;
  projectColor?: string;
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

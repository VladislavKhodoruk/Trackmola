import { getPeriod } from '@shared/helpers/helpers';
import { Period, User } from '@shared/interfaces/interfaces';
import { Timestamp } from 'firebase/firestore';

export interface CommonState {
  loadingStatus: LoadingStatus;
  user: User | null;
  date: Date;
  tasksTrack: TaskTrack[];
  period: Period;
  usersInProjects: User[];
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

export const initialState: CommonState = {
  loadingStatus: {
    loading: false,
    loaded: false,
    errorMessage: '',
  },
  user: null,
  date: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ),
  tasksTrack: [],
  usersInProjects: [],
  period: getPeriod(new Date(), 'week'),
};

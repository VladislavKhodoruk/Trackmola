import { getPeriod } from '@shared/helpers/helpers';
import {
  Period,
  Project,
  User,
  Task,
  TaskTrack,
} from '@shared/interfaces/interfaces';

export interface CommonState {
  loadingStatus: LoadingStatus;
  user: User | null;
  date: number;
  taskTracks: TaskTrack[];
  tasks: Task[];
  projects: Project[];
  users: User[];
  period: Period;
  usersInProjects: User[];
}

export interface LoadingStatus {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
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
  ).getTime(),
  taskTracks: [],
  tasks: [],
  projects: [],
  users: [],
  usersInProjects: [],
  period: getPeriod(new Date(), 'week'),
};

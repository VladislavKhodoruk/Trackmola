import { PeriodType } from '@shared/enums/enum';
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
  date: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime(),
  loadingStatus: {
    errorMessage: '',
    loaded: false,
    loading: false,
  },
  period: getPeriod(new Date(), PeriodType.Week),
  projects: [],
  taskTracks: [],
  tasks: [],
  user: null,
  users: [],
  usersInProjects: [],
};

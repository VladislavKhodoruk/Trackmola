import { getPeriod } from '@shared/helpers/helpers';
import {
  Project,
  TaskTrack,
  Task,
  User,
  Period,
} from '@shared/interfaces/interfaces';

export interface ProjectsState {
  projects: Project[];
  tasks: Task[];
  taskTracks: TaskTrack[];
  users: User[];
  period: Period;
  selectedProject?: Project;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  projects: [],
  tasks: [],
  taskTracks: [],
  users: [],
  period: getPeriod(new Date(), 'week'),
};

import { Project, User } from '@shared/interfaces/interfaces';
import { Task } from '@pages/report/interfaces/interfaces';
import { TaskTrack } from '@store/shared/shared.state';

export interface DashboardState {
  weekReportTime: number;
  allProjects: Project[];
  allTasks: Task[];
  allUsers: User[];
  activeTasks: TaskTrack[];
  allTaskTracks: TaskTrack[];
}

export const dashboardState: DashboardState = {
  weekReportTime: 0,
  allProjects: [],
  allTasks: [],
  allUsers: [],
  activeTasks: [],
  allTaskTracks: [],
};

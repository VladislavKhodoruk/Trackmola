import { Project, TaskTrack } from '@shared/interfaces/interfaces';
import { Task } from '@pages/report/interfaces/interfaces';

export interface ReportState {
  allProjects: Project[];
  allTasks: Task[];
  taskTrack?: TaskTrack;
}

export const reportState: ReportState = {
  allProjects: [],
  allTasks: [],
};

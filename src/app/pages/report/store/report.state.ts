import { Project } from '@shared/interfaces/interfaces';
import { Task } from '@pages/report/interfaces/interfaces';

export interface ReportState {
  allProjects: Project[];
  allTasks: Task[];
}

export const reportState: ReportState = {
  allProjects: [],
  allTasks: [],
};

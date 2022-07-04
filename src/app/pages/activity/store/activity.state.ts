import { getPeriod } from '@shared/helpers/helpers';
import { Period, Project, TaskTrack } from '@shared/interfaces/interfaces';

export interface ActivityState {
  period: Period;
  tasks: TaskTrack[];
  projects: Project[];
}

export const activityState: ActivityState = {
  period: getPeriod(new Date(), 'week'),
  tasks: [],
  projects: [],
};

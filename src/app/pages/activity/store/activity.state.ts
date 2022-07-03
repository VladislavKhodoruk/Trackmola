import { getPeriod } from '@shared/helpers/helpers';
import { Period, Project, Task } from '@shared/interfaces/interfaces';

export interface ActivityState {
  period: Period;
  tasks: Task[];
  projects: Project[];
}

export const activityState: ActivityState = {
  period: getPeriod(new Date(), 'week'),
  tasks: [],
  projects: [],
};

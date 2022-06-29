import { Project, Task } from '@pages/projects/interfaces/interfaces';
import { getFirstAndLastDay } from '@shared/helpers/helpers';

export interface ActivityState {
  period: {
    start: number;
    end: number;
  };
  tasks: Task[];
  projects: Project[];
}

export const activityState: ActivityState = {
  period: getFirstAndLastDay(new Date(), 'month'),
  tasks: [],
  projects: [],
};

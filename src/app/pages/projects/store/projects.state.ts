import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ProjectsState {
  period: Period;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  period: getPeriod(new Date(), PeriodType.TwoWeek),
};

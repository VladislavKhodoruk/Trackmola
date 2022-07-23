import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ProjectsState {
  userPeriod: Period;
  searchValue?: string;
}

export const projectsState: ProjectsState = {
  userPeriod: getPeriod(new Date(), PeriodType.Week),
};

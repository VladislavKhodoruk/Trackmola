import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

export interface ReportConstructorState {
  period: Period;
  projectId?: string;
}

export const reportConstructorState: ReportConstructorState = {
  period: getPeriod(new Date(), 'week'),
};

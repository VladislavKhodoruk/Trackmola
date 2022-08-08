import { createFeatureSelector } from '@ngrx/store';

import { VacationState } from './vacations.state';

import { StateName } from '@shared/enums/enum';

export const VACATIONS_STATE_NAME = StateName.Vacations;

const getVacationsState =
  createFeatureSelector<VacationState>(VACATIONS_STATE_NAME);

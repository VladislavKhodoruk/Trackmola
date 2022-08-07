import { Action, createReducer } from '@ngrx/store';

import { vacationState, VacationState } from './vacations.state';

const vacationsReducer = createReducer(vacationState);

export function VacationsReducer(state: VacationState, action: Action) {
  return vacationsReducer(state, action);
}

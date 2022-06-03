import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './trackMola.reducer';

export namespace trackMolaSelectors {
  export const state = createFeatureSelector<State>('trackMola');
  export const data = createSelector(state, (state) => state.data);
}

import { Action, createReducer, on } from '@ngrx/store';
import { trackMolaActions } from './trackMola.actions';

export interface State {
  data: [];
}

const initialState: State = {
  data: [],
};

const trackMolaReducer = createReducer(
  initialState,
  on(trackMolaActions.getData, (state) => ({
    ...state,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return trackMolaReducer(state, action);
}

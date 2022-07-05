import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { StateName } from '@shared/enums/enum';
import { SharedReducer } from './shared/shared.reducer';
import { SharedState } from './shared/shared.state';

export interface TrackMolaState {
  [StateName.Shared]: SharedState;
  [StateName.Router]: RouterReducerState;
}

export const trackMolaReducer = {
  [StateName.Shared]: SharedReducer,
  [StateName.Router]: routerReducer,
};

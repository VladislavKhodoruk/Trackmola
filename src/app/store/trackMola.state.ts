import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { StateName } from '@shared/enums/enum';
import { CommonReducer } from './common/common.reducer';
import { CommonState } from './common/common.state';

export interface TrackMolaState {
  [StateName.Common]: CommonState;
  [StateName.Router]: RouterReducerState;
}

export const trackMolaReducer = {
  [StateName.Common]: CommonReducer,
  [StateName.Router]: routerReducer,
};

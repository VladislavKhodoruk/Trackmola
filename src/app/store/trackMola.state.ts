import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { CommonReducer } from './common/common.reducer';
import { CommonState } from './common/common.state';

import { StateName } from '@shared/enums/enum';

export interface TrackMolaState {
  [StateName.Common]: CommonState;
  [StateName.Router]: RouterReducerState;
}

export const trackMolaReducer = {
  [StateName.Common]: CommonReducer,
  [StateName.Router]: routerReducer,
};

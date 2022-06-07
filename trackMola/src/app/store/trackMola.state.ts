import { CommonState } from './common.state';
import { COMMON_NAME } from './common.selectors';
import { CommonReducer } from './common.reducer';

export interface TrackMolaState {
  [COMMON_NAME]: CommonState;
}

export const trackMolaReducer = {
  [COMMON_NAME]: CommonReducer,
};

import { SharedReducer } from './shared/shared.reducer';
import { SHARED_NAME } from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';

export interface TrackMolaState {
  [SHARED_NAME]: SharedState;
}

export const trackMolaReducer = {
  [SHARED_NAME]: SharedReducer,
};

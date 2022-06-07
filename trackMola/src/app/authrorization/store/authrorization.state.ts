import { User } from 'src/app/common/models';

export interface AuthrorizationState {
  user: User | null;
}

export const initialState: AuthrorizationState = {
  user: null,
};

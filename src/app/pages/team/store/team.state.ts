import { User } from '@shared/interfaces/interfaces';

export interface TeamState {
  user: User | null;
}

export const teamState: TeamState = {
  user: null,
};

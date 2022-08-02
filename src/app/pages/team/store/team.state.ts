import { User } from '@shared/interfaces/interfaces';

export interface TeamState {
  //forEach(arg0: (user: any) => any): any;
  user?: User | null;
}

export const teamState: TeamState = {
  user: null,
};

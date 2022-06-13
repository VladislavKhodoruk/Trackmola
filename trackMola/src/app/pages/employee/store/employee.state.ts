import { ProfileUser } from 'src/app/shared/interfaces/interfaces';

export interface EmployeeState {
  user: ProfileUser | null;
}

export const initialState: EmployeeState = {
  user: null,
};

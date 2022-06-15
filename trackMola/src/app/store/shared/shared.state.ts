import { ProfileUser } from 'src/app/shared/interfaces/interfaces';

export interface SharedState {
  loadingStatus: LoadingStatus;
  user: ProfileUser | null;
}

export interface LoadingStatus {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

export const initialState: SharedState = {
  loadingStatus: {
    loading: false,
    loaded: false,
    errorMessage: '',
  },
  user: null,
};

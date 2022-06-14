export interface SharedState {
  loadingStatus: LoadingStatus;
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
};

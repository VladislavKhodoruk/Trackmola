export interface CommonState {
  loading: boolean;
  errorMessage: string;
}

export const initialState: CommonState = {
  loading: false,
  errorMessage: '',
};

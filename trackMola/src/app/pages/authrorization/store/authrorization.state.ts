export interface AuthrorizationState {
  userType?: string | null;
}

export const initialState: AuthrorizationState = {
  userType: null,
};

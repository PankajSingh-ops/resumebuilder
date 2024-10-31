import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface User {
  id: string;
  email: string;
  credits: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    updateCredits: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.credits = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(HYDRATE as any, (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { setCredentials, updateCredits, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;

// Type for the RootState
export interface RootState {
  auth: AuthState;
}

// Type-safe selectors
export const selectAuth = (state: RootState) => state.auth;
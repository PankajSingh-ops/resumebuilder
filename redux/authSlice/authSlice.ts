import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import Cookies from 'js-cookie';

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

     // Store in cookies only
     Cookies.set('token', token);
     Cookies.set('user', JSON.stringify(user));
   },
   
   updateCredits: (state, action: PayloadAction<number>) => {
     if (state.user) {
       state.user.credits = action.payload;
       
       // Update user in cookies
       Cookies.set('user', JSON.stringify(state.user), { path: '/' });
     }
   },
   
   logout: (state) => {
     state.user = null;
     state.token = null;
     state.isLoggedIn = false;
     
     // Clear cookies
     Cookies.remove('token');
     Cookies.remove('user');
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

export interface RootState {
 auth: AuthState;
}

export const selectAuth = (state: RootState) => state.auth;
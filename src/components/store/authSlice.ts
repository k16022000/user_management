import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('auth') === 'true',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      localStorage.setItem('auth', 'true');
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
});

export const { setAuthenticated, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice,PayloadAction  } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userName: '',
  },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userName = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

// 1. Define the State Type explicitly
type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

// 2. Apply the type to initialState
const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

// --- Thunks ---

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('refreshToken')) {
      try {
        const res = await getUserApi();
        return res.user;
      } catch (error) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        throw error;
      }
    } else {
      dispatch(authChecked()); // Mark auth as checked even if failed
      return Promise.reject('No token');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res.user;
  }
);

// --- Slice ---

const userSlice = createSlice({
  name: 'user',
  initialState, // Now uses the typed initialState
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message || 'Register failed';
    });

    // Login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthChecked = true;
      state.error = action.error.message || 'Login failed';
    });

    // Check Auth
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    });
    builder.addCase(checkUserAuth.rejected, (state) => {
      state.user = null;
      state.isAuthChecked = true;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });

    // Update User
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message || 'Update failed';
    });
  }
});

// --- Selectors ---
export const getUserSelector = (state: any) => state.user.user;
export const getIsAuthCheckedSelector = (state: any) =>
  state.user.isAuthChecked;
export const getUserErrorSelector = (state: any) => state.user.error;

export const { authChecked } = userSlice.actions;
export default userSlice.reducer;

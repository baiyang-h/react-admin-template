import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, getUserInfoApi } from '@/api/user';
import { setToken, removeToken } from '@/utils/token';

// 异步登录action
export const login = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await loginApi(credentials);
    const { token } = response.data;
    setToken(token);
    return response.data;
  }
);

  // 获取用户信息action
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const response = await getUserInfoApi();
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userInfo: null,
    permissions: [],
    roles: [],
    loading: false,
    loginError: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.permissions = [];
      state.roles = [];
      removeToken();
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 处理登录状态
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.error.message;
      })
      // 处理获取用户信息状态
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.permissions = action.payload.permissions;
        state.roles = action.payload.roles;
      });
  },
});

export const { logout, setUserInfo } = userSlice.actions;

// 选择器
export const selectUserInfo = (state) => state.user.userInfo;
export const selectPermissions = (state) => state.user.permissions;
export const selectUserLoading = (state) => state.user.loading;
export const selectLoginError = (state) => state.user.loginError;

export default userSlice.reducer;
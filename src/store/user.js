import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, getUserInfoApi } from '@/api/user';
import { setToken, removeToken } from '@/utils/token';

// 异步登录action
export const login = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await loginApi(credentials);
    const { data } = response.data;
    setToken(data);
    return response.data;
  }
);

  // 获取用户信息action
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfoApi();
      // 假设后端返回格式为 { code: 200, data: { userInfo, permissions, roles } }
      const { code, data } = response.data;

      // // 模拟权限数据
      // const userPermissions = [
      //   'home',
      //   'permission',
      //   'permissionPage',
      //   'permissionRole',
      //   'table',
      //   'dragTable',
      //   'form',
      //   'nested',
      //   'nestedMenu1',
      //   'nestedMenu1-1',
      //   'nestedMenu1-2',
      //   'nestedMenu1-2-1',
      //   'nestedMenu1-2-2'
      // ];
      
      if (code === 200) {
        return {
          userInfo: data.userInfo,
          permissions: data.permissions || [],
          roles: data.roles || []
        };
      } else {
        return rejectWithValue('获取用户信息失败');
      }
    } catch (error) {
      return rejectWithValue(error.message || '获取用户信息失败');
    }
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
        state.token = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.error.message;
      })
      // 处理获取用户信息状态
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.permissions = action.payload.permissions;
        state.roles = action.payload.roles;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.permissions = [];
        state.roles = [];
        // 可以选择在这里处理错误信息
        // ...
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
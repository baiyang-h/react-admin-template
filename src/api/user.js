import request, { basePost } from '../utils/request'

// 登录，获取token
export const loginApi = data => basePost('/user/login', data);

// 通过获取用户信息
export const getUserInfoApi = token => request({
  url: '/user/info',
  method: 'get',
  params: { token }
});

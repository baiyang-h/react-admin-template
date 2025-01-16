import request, { basePost } from '../utils/request'

// 登录，获取token
// export const loginApi = data => basePost('/user/login', data);
export const loginApi = data => basePost('https://apifoxmock.com/m2/5766065-5449723-default/254712036', data);

// 通过获取用户信息
// export const getUserInfoApi = () => request({
//   url: '/user/info',
//   method: 'get',
//   // 不需要手动传token，因为已经在请求拦截器中统一处理了,存到了cookie上
// });
export const getUserInfoApi = () => request({
  url: 'https://apifoxmock.com/m2/5766065-5449723-default/254861349',
  method: 'get',
});
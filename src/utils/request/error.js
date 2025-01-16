import { message } from "antd";
import { store } from '@/store'
import { logout } from '@/store/user'
import { removeToken } from '../token'
// import { loginOutActions } from '@/store/modules/user/reducer'
// import history from '@/router/history'

const errorHandle = r => {
    if (r.status) {
        switch (r.status) {

            case 304:
                // ...
                message.error(304)
                break;

            // 401: token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空store中token对象
            // 跳转登录页面
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            // 401 Unauthorized状态码表示请求没有被认证或者认证失败，通常是由于token失效、缺失或伪造，导致服务端无法识别身份‌
            case 401:
                message.error('登录过期，请重新登录');
                 // 清除token logout 方法中已经有了，所以这边删除了
                //  removeToken();
                // token失效，执行登出操作
                store.dispatch(logout());
                // 跳转到登录页
                window.location.href = '/login';
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                break;
            // 403 
            // 403 Forbidden状态码表示用户已经通过了身份验证，但由于权限不足，无法访问特定的资源‌
            case 403:
                message.error(403);
                break;
            // 404请求不存在
            case 404:
                message.error(404);
                break;
            // 其他错误，直接抛出错误提示
            case 500:
                message.error(500)
                // ...
                break;
            default:
                message.error(r.data.message)
        }
    }
}

export default errorHandle

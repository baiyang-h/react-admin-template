import { ElMessage } from 'element-plus'
import { removeToken } from '@/libs/token'
import { useRouter } from 'vue-router'

const errorHandle = r => {
    if (r.status) {
        const router = useRouter()
        switch (r.status) {

            case 304:
                // ...
                ElMessage.error('304')
                break;

            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                router.replace('/')
                break;

            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                ElMessage.error('登录过期，请重新登录');
                // 清除token
                removeToken();
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                // ...... 未写

                setTimeout(() => {
                    router.replace('/login')
                }, 1000);
                break;

            // 404请求不存在
            case 404:
                ElMessage.error('404');
                break;
            // 其他错误，直接抛出错误提示
            case 500:
                ElMessage.error('500')
                // ...
                break;
            default:
                ElMessage.error(r.data.message)
        }
    }
}

export default errorHandle
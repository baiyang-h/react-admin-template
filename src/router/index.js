import ROUTE_CONFIG from './router.config'
import { formatAppRouter } from './util'

// 首先对 app路由 进行了格式化，格式化你想的结构  ---> 至于后面的权限相关，再下一步格式化
export const constantRoutes = ROUTE_CONFIG.constantRoutes;

export const appRoutes = formatAppRouter(ROUTE_CONFIG.appRoutes); // 此处是需要权限相关展示的路由
import { isUrl } from "@/utils/common/regexp";
import { join } from 'path-browserify'

/**
 * @description 将应用路由进行重新格式化，主要针对 appRoutes 应用路由，将 children 路由的 path 和 roles，根据父级补全，如 父 /home，子 index --> 子格式化为 /home/index
 * @param routes        传入的路由，如 appRoutes， item.children
 * @param parentPath    父的 path，  为了拼接完整路径
 * @param parentRoles   父的 roles   父的权限补齐子权限
 * @returns {*}         返回一个新的 routes
 */
export const formatAppRouter = (routes, parentPath='/', parentRoles=[]) => {
  return routes.map(item => {
    let { path } = item;
    // 是否是 url 地址
    if (!isUrl(path)) {
      path = join(parentPath, path)
    }
    const result = {
      ...item,
      path,
      roles: item.roles || parentRoles,
    };

    if (item.children) {
      result.children = formatAppRouter(item.children, path, item.roles);
    } else {
      result.children = []
    }

    return result;
  });
}

// 根据权限过滤路由（递归处理）
export const filterRoutes = (routes, permissions=[]) => {
  return routes.filter((route) =>
    route.meta && route.meta.permission ? permissions.includes(route.meta.permission) : true
  ).map((route) => ({
    ...route,
    children: route.children
      ? filterRoutes(route.children, permissions)
      : [],
  }));
}
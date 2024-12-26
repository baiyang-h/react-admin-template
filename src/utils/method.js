/**
 * 项目中使用的方法
 */

import { join } from 'path-browserify'
import { isUrl, isNumber } from "./common/regexp";

/* ============================== 路由/菜单部分  ============================= */

/**
 * @description 将路由进行重新格式化，主要针对 appRoutes 应用路由，将 children 路由的 path 和 roles，根据父级补全，如 父 /home，子 index --> 子格式化为 /home/index
 * @param routes        传入的路由，如 appRoutes， item.children
 * @param parentPath    父的 path，  为了拼接完整路径
 * @param parentRoles   父的 roles   父的权限补齐子权限
 * @returns {*}         返回一个新的 routes
 */
export function wrapFormatterRouter(routes, parentPath='/', parentRoles) {
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
      result.children = wrapFormatterRouter(item.children, path, item.roles);
    } else {
      result.children = []
    }

    return result;
  });
}

/**
 * @description 根据处理过的 routes 解析成 menus 菜单，会直接处理好。 没有 children 就表示没有子菜单。 如:
 * 考虑到 不是 submenu 的菜单在不写 isSubmenu 属性的情况下也会无脑的嵌套下去 [[[...]]]，我们就根据规则获取最后的菜单， 后面覆盖前面的
 * [
 *  {
 *    path: '/home/index',
 *    name: 'Home',
 *    meta: {title: '首页'}
 *  },
 *  {
 *    path: '/nested',
 *    name: 'Nested',
 *    meta: {title: '路由嵌套', ...},
 *    children: [
 *        ...
 *    ]
 *  },
 * ]
 * @param routes   是 1.处理过的格式化路由，2.也是有权限的路由
 * @param roles    后台返回的角色信息
 * @returns {[]}   返回格式化后的并且有权限显示的菜单
 */
export function wrapFormatterMenu(routes=[], roles) {
  const res = [];
  // 该菜单即相关子菜单是否显示，关联有：权限、meta.hidden属性
  const isNeed = (route) => hasPermission(roles, route) && !(route.meta && route.meta.hidden)

  // 对于没有 isSubmenu 的菜单，如果也写了 children 一层层的，我们来获取真正要显示的 menu
  const getOnlyLastRoute = (route) => {
    let onlyLastRoute = {};
    // 经过 wrapFormatterRouter 处理过后 不管有没有子集 route.children 都会有，不过对于没子集的普通菜单 children 为[]
    const showingChildren = route.children.filter(childRoute => {
      if (isNeed(childRoute)) {
        // 如果子路由下存在多个路由，则选择最后一个，后者覆盖前面的，对于子路由的子路由，递归只获取最后一个
        onlyLastRoute = getOnlyLastRoute(childRoute);
        return true
      } else {
        return false
      }
    })
    // 当el-menu-item路由写法 不写children层（没有子路由的时），直接只写父层时，直接取父级
    if(!showingChildren.length) onlyLastRoute = route;
    // 对于没有定义 isSubmenu 却又写了 children 子路由的情况时，如果子路由中不写meta，那么使用父的mata
    if(!onlyLastRoute.meta) {
      onlyLastRoute.meta = route.meta
    }
    return onlyLastRoute
  }

  routes.forEach(route => {
    // 1.有权限的路由  2. 不是meta.hidden为true的菜单，默认就是undefined。 即不隐藏的路由
    if(isNeed(route)) { // 是否显示菜单
      if(route.meta && route.meta.isSubmenu) {   // Submenu 有子菜单的菜单
        const tmp = {
          path: route.path,
          redirect: route.redirect,
          name: route.name,
          meta: route.meta,
        };
        if(route.children && route.children.length) {
          tmp.children = wrapFormatterMenu(route.children, roles)
        }
        res.push(tmp)
      } else {
        // 获取到应该显示的最后菜单（这边做一些兼容写法，可能存在随意写，没有定义isSubmenu该字段的情况，理应是需要写isSubmenu该字段，如果有子菜单的话）
        let onlyLastRoute = getOnlyLastRoute(route);
        const tmp = {
          path: onlyLastRoute.path,
          redirect: onlyLastRoute.redirect,
          name: onlyLastRoute.name,
          meta: onlyLastRoute.meta,
        };
        res.push(tmp)
      }
    }
  });

  return res
}

/**
 * @description                     路由是否有权限
 * @param roles: any[]              服务端返回的权限角色
 * @param route: any[]              单个菜单应用路由信息
 * @returns {boolean|*}
 */
function hasPermission(roles, route) {
  if(route.roles) {  // 返回的角色信息在 route的 roles 中，表示有权限
    return roles.some(role => route.roles.includes(role))
  } else {   // route 中不写 roles 表示都有权限
    return true
  }
}

/**
 * @description             对 appRoutes 菜单应用路由进行权限过滤，处理后只有有权限的路由，没有权限的路由过滤掉
 * @param routes:any[]      appRoutes  所有菜单应用路由
 * @param roles: any[]      服务端返回的角色信息，例如 ['admin', 'other']
 * @returns {[]}            返回过滤后有权限的路由
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if(hasPermission(roles, tmp)) {
      if(tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });
  return res
}

/**
 * @description   将路由拉平
 * @param routes
 * @returns {[]}  返回一个新的拉平后的数组
 */
export function flatRoutes(routes) {
  let flatData = [];
  routes.forEach(item => {
    if(item.children) {
      flatData = [...flatData, item, ...flatRoutes(item.children)]
    } else {
      flatData.push(item)
    }
  })
  return flatData
}


/* ============================== 其他  ============================= */
// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
export function addUnit(value='auto', unit='px') {
  value = String(value);
  // 验证规则中的number判断是否为数值
  return isNumber(value) ? `${value}${unit}` : value;
}

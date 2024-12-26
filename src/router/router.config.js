// 常量路由
export const constantRoutes = [
  {
    title: 'Login',
    path: '/login',
    name: 'Login',
    // component: '',
  },
  {
    title: '403',
    path: '/403',
    name: '403',
    // component: '',
  },
  {
    title: '404',
    path: '/404',
    name: '404',
    // component: '',
  },
  {
    title: '500',
    path: '/500',
    name: '500',
    // component: '',
  }
]

/**
 * app应用 菜单路由
 * path     菜单路由
 * name     key
 * title    菜单名称
 * hidden   菜单模块隐藏/显示
 * roles  表示权限，[admin, other]， 表示有这两种权限，admin表示超级管理员，如果roles没写，没有，则表示全权限
 */
export const appRoutes = [
  {
    path: '/home',
    name: 'Home',
  },
  {
    path: '/permission',
    name: 'Permission',
    children: [
      {
        path: 'page',
        name: 'PermissionPage',
      },
      {
        path: 'role',
        name: 'PermissionRole',
      },
    ]
  },
  {
    path: '/table',
    name: 'Table',
  },
  {
    path: '/form',
    name: 'Form',
  },
  {
    path: '/nested',
    name: 'Nested',
    children: [
      {
        path: 'menu1',
        name: 'NestedMenu1',
        children: [
          {
            path: 'menu1-1',
            name: 'NestedMenu1-1',
          },
          {
            path: 'menu1-2',
            name: 'NestedMenu1-2',
            children: [
              {
                path: 'menu1-2-1',
                name: 'NestedMenu1-2-1',
              },
              {
                path: 'menu1-2-2',
                name: 'NestedMenu1-2-2',
              },
            ]
          },
          {
            path: 'menu1-3',
            name: 'NestedMenu1-3',
          },
        ]
      },
    ]
  },
]
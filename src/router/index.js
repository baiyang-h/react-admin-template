import Login from '../views/login'
import ErrorPage403 from '../views/error-page/403'
import ErrorPage404 from '../views/error-page/404'
import ErrorPage500 from '../views/error-page/500'
import Home from '../views/home'
import PermissionPage from '../views/permission/page'
import PermissionRole from '../views/permission/role'
import Table from '../views/table'
import DragTable from '../views/table/drag-table'


export const routes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/home',
    element: <Home />,
    meta: {
      title: 'Home',
      permission: 'home'
    },
  },
  {
    path: '/permission',
    meta: {
      title: 'Permission',
      permission: 'permission'
    },
    children: [
      {
        path: 'page',
        element: <PermissionPage />,
        meta: {
          title: 'PermissionPage',
          permission: 'permissionPage'
        },
      },
      {
        path: 'role',
        element: <PermissionRole />,
        meta: {
          title: 'PermissionRole',
          permission: 'permissionRole'
        },
      },
    ]
  },
  {
    path: '/table',
    meta: {
      title: 'Table',
      permission: 'table'
    },
    children: [
      {
        path: '',
        element: <Table />,
        meta: {
          title: '基础表格',
          permission: 'table'
        },
      },
      {
        path: 'dragTable',
        element: <DragTable />,
        meta: {
          title: '拖拽表格',
          permission: 'dragTable'
        },
      },
    ]
  },
  {
    path: '/403',
    element: <ErrorPage403 />,
    meta: {
      title: '403',
    },
  },
  {
    path: '/404',
    element: <ErrorPage404 />,
    meta: {
      title: '404',
    },
  },
  {
    path: '/500',
    element: <ErrorPage500 />,
    meta: {
      title: '500',
    },
  },
]

/**
 * app应用 菜单路由
 * path     菜单路由
 * name     key
 * title    菜单名称
 * hidden   菜单模块隐藏/显示
 * roles  表示权限，[admin, other]， 表示有这两种权限，admin表示超级管理员，如果roles没写，没有，则表示全权限
 */
const appRoutes = [
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

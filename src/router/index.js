import Login from '../views/login'
import ErrorPage403 from '../views/error-page/403'
import ErrorPage404 from '../views/error-page/404'
import ErrorPage500 from '../views/error-page/500'
import Home from '../views/home'
import PermissionPage from '../views/permission/page'
import PermissionRole from '../views/permission/role'
import Table from '../views/table'
import DragTable from '../views/table/drag-table'
import Form from '../views/form'
import NestedMenu1a1 from '../views/nested/menu1/menu1-1'
import NestedMenu1a2a1 from '../views/nested/menu1/menu1-2/menu1-2-1'
import NestedMenu1a2a2 from '../views/nested/menu1/menu1-2/menu1-2-2'

// 模拟权限数据
// const userPermissions = ['home', 'permission', 'permissionPage', 'permissionRole', 'table', 'dragTable', 'form', 'nested', 'nestedMenu1', 'nestedMenu1-1', 'nestedMenu1-2', 'nestedMenu1-2-1', 'nestedMenu1-2-2'];

export const constantRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: 'Login',
    },
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
 * title    菜单名称
 * hidden   菜单模块隐藏/显示
 * permission  权限名称
 */
export const appRoutes = [
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
    path: '/form',
    element: <Form />,
    meta: {
      title: 'Form',
      permission: 'form'
    },
  },
  {
    path: '/nested',
    meta: {
      title: 'Nested',
      permission: 'nested'
    },
    children: [
      {
        path: 'menu1',
        meta: {
          title: 'NestedMenu1',
          permission: 'nestedMenu1'
        },
        children: [
          {
            path: 'menu1-1',
            element: <NestedMenu1a1 />,
            meta: {
              title: 'NestedMenu1-1',
              permission: 'nestedMenu1-1'
            },
          },
          {
            path: 'menu1-2',
            meta: {
              title: 'NestedMenu1-2',
              permission: 'nestedMenu1-2'
            },
            children: [
              {
                path: 'menu1-2-1',
                element: <NestedMenu1a2a1 />,
                meta: {
                  title: 'NestedMenu1-2-1',
                  permission: 'nestedMenu1-2-1'
                },
              },
              {
                path: 'menu1-2-2',
                element: <NestedMenu1a2a2 />,
                meta: {
                  title: 'NestedMenu1-2-2',
                  permission: 'nestedMenu1-2-2'
                },
              },
            ]
          },
        ]
      },
    ]
  },
]

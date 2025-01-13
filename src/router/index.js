import { lazy } from 'react';
import LazyLoad from '@/components/LazyLoad';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// 开发环境使用延迟，生产环境不使用
const lazyLoadWithDelay = (factory, ms = 2000) => {
  return lazy(async () => {
    await delay(ms);
    return factory();
  });
};


// 动态导入组件
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../views/login'))
const ErrorPage403 = lazy(() => import(/* webpackChunkName: "ErrorPage403" */ '../views/error-page/403'))
const ErrorPage404 = lazy(() => import(/* webpackChunkName: "ErrorPage404" */ '../views/error-page/404'))
const ErrorPage500 = lazy(() => import(/* webpackChunkName: "ErrorPage500" */ '../views/error-page/500'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../views/home'))
const PermissionPage = lazy(() => import(/* webpackChunkName: "PermissionPage" */ '../views/permission/page'))
const PermissionRole = lazy(() => import(/* webpackChunkName: "PermissionRole" */ '../views/permission/role'))
const Table = lazy(() => import(/* webpackChunkName: "Table" */ '../views/table'))
const DragTable = lazy(() => import(/* webpackChunkName: "DragTable" */ '../views/table/drag-table'))
const Form = lazy(() => import(/* webpackChunkName: "Form" */ '../views/form'))
const NestedMenu1a1 = lazy(() => import(/* webpackChunkName: "NestedMenu1a1" */ '../views/nested/menu1/menu1-1'))
const NestedMenu1a2a1 = lazy(() => import(/* webpackChunkName: "NestedMenu1a2a1" */ '../views/nested/menu1/menu1-2/menu1-2-1'))
const NestedMenu1a2a2 = lazy(() => import(/* webpackChunkName: "NestedMenu1a2a2" */ '../views/nested/menu1/menu1-2/menu1-2-2'))

// 模拟权限数据
// const userPermissions = ['home', 'permission', 'permissionPage', 'permissionRole', 'table', 'dragTable', 'form', 'nested', 'nestedMenu1', 'nestedMenu1-1', 'nestedMenu1-2', 'nestedMenu1-2-1', 'nestedMenu1-2-2'];

export const constantRoutes = [
  {
    path: '/login',
    element: <LazyLoad><Login /></LazyLoad>,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/403',
    element: <LazyLoad><ErrorPage403 /></LazyLoad>,
    meta: {
      title: '403',
    },
  },
  {
    path: '/404',
    element: <LazyLoad><ErrorPage404 /></LazyLoad>,
    meta: {
      title: '404',
    },
  },
  {
    path: '/500',
    element: <LazyLoad><ErrorPage500 /></LazyLoad>,
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
    element: <LazyLoad><Home /></LazyLoad>,
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
        element: <LazyLoad><PermissionPage /></LazyLoad>,
        meta: {
          title: 'PermissionPage',
          permission: 'permissionPage'
        },
      },
      {
        path: 'role',
        element: <LazyLoad><PermissionRole /></LazyLoad>,
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
        path: 'index',
        element: <LazyLoad><Table /></LazyLoad>,
        meta: {
          title: '基础表格',
          permission: 'table'
        },
      },
      {
        path: 'dragTable',
        element: <LazyLoad><DragTable /></LazyLoad>,
        meta: {
          title: '拖拽表格',
          permission: 'dragTable'
        },
      },
    ]
  },
  {
    path: '/form',
    element: <LazyLoad><Form /></LazyLoad>,
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
            element: <LazyLoad><NestedMenu1a1 /></LazyLoad>,
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
                element: <LazyLoad><NestedMenu1a2a1 /></LazyLoad>,
                meta: {
                  title: 'NestedMenu1-2-1',
                  permission: 'nestedMenu1-2-1'
                },
              },
              {
                path: 'menu1-2-2',
                element: <LazyLoad><NestedMenu1a2a2 /></LazyLoad>,
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

function generateFullPath(routes, parentPath = '') {
  return routes.map((route) => {
    // 1.拼接完整路径，避免多个斜杠，2.如果最后也是斜杆则也去除
    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/').replace(/\/$/, '');
    const updatedRoute = { ...route, path: fullPath };

    // 如果有子路由，递归处理
    if (route.children && route.children.length) {
      updatedRoute.children = generateFullPath(route.children, fullPath);
    }

    return updatedRoute;
  });
};

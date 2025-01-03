import {ConfigProvider} from "antd";
import { Routes, Route } from "react-router";
import './App.css';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';

import { constantRoutes, appRoutes } from './router'
import MainLayout from './layout'

dayjs.locale('zh-cn');

// 模拟权限数据
const userPermissions = ['home', 'permission', 'permissionPage', 'permissionRole', 'table', 'dragTable', 'form', 'nested', 'nestedMenu1', 'nestedMenu1-1', 'nestedMenu1-2', 'nestedMenu1-2-1', 'nestedMenu1-2-2'];

// 递归渲染路由函数
const renderRoutes = (routes) => {
  return routes.map((route) => {
    // 如果当前路由有子路由，则递归渲染
    if (route.children && route.children.length) {
      return (
        <Route path={route.path} key={route.path}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    // 如果没有子路由，则直接渲染
    return (
      <Route
        path={route.path}
        key={route.path}
        element={route.element}
      />
    );
  });
};

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Routes>
          {
            constantRoutes.map(item => <Route key={item.path} path={item.path} element={item.element} />)
          }
          <Route element={<MainLayout permissions={userPermissions} />}>
            { renderRoutes(appRoutes) }
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;

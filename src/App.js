import {ConfigProvider} from "antd";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router";
import './App.css';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';

import { constantRoutes, appRoutes } from './router'
import Layout from './layout'

dayjs.locale('zh-cn');

// 模拟权限数据
const userPermissions = [
  'home',
  'permission',
  'permissionPage',
  'permissionRole',
  'table',
  'dragTable',
  'form',
  'nested',
  'nestedMenu1',
  'nestedMenu1-1',
  'nestedMenu1-2',
  'nestedMenu1-2-1',
  'nestedMenu1-2-2'
];

// 递归渲染路由函数
const renderRoutes = (routes, permissions) => {
  return routes.map((route) => {
    const { path, element, children, meta } = route;

    // 权限判断：没有权限直接跳过该路由
    if (meta?.permission && !permissions.includes(meta.permission)) {
      return null;
    }

    // 如果有子路由，则递归处理
    if (children && children.length) {
      return (
        <Route path={path} key={path} element={element || <Navigate to={`${path}/${children[0].path}`} />}>
          {renderRoutes(route.children, permissions)}
        </Route>
      );
    }

    // 返回普通路由
    return <Route key={path} path={path} element={element} />;
  });
};

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router>
          <Routes>
            {/* 渲染 constantRoutes（无需权限判断） */}
            { renderRoutes(constantRoutes, []) }

            {/* 渲染带 Layout 的路由 */}
            <Route path="/" element={<Layout />}>
              {/* 渲染 appRoutes（需要权限判断） */}
              {renderRoutes(appRoutes, userPermissions)}
            </Route>

            {/* 未匹配路由时重定向到 404 */}
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;

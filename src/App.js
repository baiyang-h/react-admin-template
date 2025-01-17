import { Routes, Route, Navigate } from "react-router";
import { useSelector } from 'react-redux';
import './App.css';
import { constantRoutes, appRoutes } from './router'
import Layout from './layout'
import AuthGuard from './components/AuthGuard'
import { selectPermissions } from './store/user'

// 递归渲染路由函数
const renderRoutes = (routes, permissions, parentPath = '') => {
  return routes.map((route) => {
    const { path, element, children, meta } = route;

    // 拼接完整路径
    const fullPath = `${parentPath}/${path}`.replace(/\/+/g, '/').replace(/\/$/, '');

    // 权限判断：没有权限直接跳过该路由
    if (meta?.permission && !permissions.includes(meta.permission)) {
      return null;
    }
    // 如果有子路由，则递归处理
    if (children && children.length) {
      return (
        <Route path={path} key={fullPath} element={element}>
          {renderRoutes(route.children, permissions, fullPath)}
        </Route>
      );
    }

    // 返回普通路由
    return <Route key={fullPath} path={fullPath} element={element} />;
  });
};

function App() {
  // 用户权限数据
  const userPermissions = useSelector(selectPermissions)
  
  return (
    <div className="App">
      <AuthGuard>
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
      </AuthGuard>

    </div>
  );
}

export default App;

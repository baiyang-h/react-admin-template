import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import {ConfigProvider} from "antd";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router";
import './App.css';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';
import { constantRoutes, appRoutes } from './router'
import Layout from './layout'
import { getUserInfo, selectUserInfo, logout } from './store/user'
import { getToken } from './utils/token';

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
  // const dispatch = useDispatch();
  // const userInfo = useSelector(selectUserInfo);

  // useEffect(() => {
  //   const token = getToken();
  //   if(token){
  //     // 有token但没有用户信息时获取用户信息
  //     if (!userInfo) {
  //       dispatch(getUserInfo()).catch(err => {
  //         // 获取用户信息失败(token可能失效)，执行登出操作
  //         dispatch(logout());
  //         navigate('/login');
  //       });
  //     }
  //   } else {
  //     // 没有token时清空用户信息并跳转登录页
  //     dispatch(logout());
  //     navigate('/login');
  //   }
  // }, [dispatch, userInfo]);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

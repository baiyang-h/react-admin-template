/**
 * 创建一个权限守卫组件
 * 这样的好处是：
 * 1.路由变化时自动检查认证状态
 * 2.集中管理权限验证逻辑
 * 3.可以设置路由白名单
 * 4.记住用户原始访问路径，登录后可以重定向回去
 * 5.更容易扩展和维护权限相关的功能
 */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '@/utils/token';
import { getUserInfo, selectUserInfo, logout } from '@/store/user';

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('APP:useEffect', userInfo)
    const checkAuth = async () => {
      const token = getToken();
      
      // 白名单路由，不需要验证
      const whiteList = ['/login', '/404', '/403'];
      if (whiteList.includes(location.pathname)) {
        return;
      }
      if (token) {
        // 有token但没有用户信息时获取用户信息
        if (!userInfo) {
          try {
            await dispatch(getUserInfo()).unwrap();
          } catch (err) {
            // 获取用户信息失败(token可能失效)，执行登出操作
            dispatch(logout());
            navigate('/login', {
              state: { from: location.pathname }
            });
          }
        }
      } else {
        // 没有token时清空用户信息并跳转登录页
        dispatch(logout());
        navigate('/login', {
          state: { from: location.pathname }
        });
      }
    };

    checkAuth();
  }, [dispatch, userInfo, location.pathname]);

  return children;
};

export default AuthGuard; 
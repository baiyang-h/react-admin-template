import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router';
import { appRoutes, generateFullPath } from '@/router';

const AppBreadcrumb = () => {
  const location = useLocation();
  const wrapAppRoutes = generateFullPath(appRoutes)
  
  // 根据当前路径生成面包屑
  const generateBreadcrumbs = (path) => {
    const breadcrumbs = [];
    let currentPath = '';
    
    // 将路径分割成数组
    const pathArray = path.split('/').filter(Boolean);
    
    // 遍历路径数组生成面包屑
    pathArray.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // 在路由配置中查找匹配的路由
      const matchedRoute = findRouteByPath(currentPath, wrapAppRoutes);
      
      if (matchedRoute && matchedRoute.meta?.title) {
        breadcrumbs.push({
          path: currentPath,
          title: matchedRoute.meta.title
        });
      }
    });
    
    return breadcrumbs;
  };
  
  // 递归查找路由
  const findRouteByPath = (path, routes) => {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        const childRoute = findRouteByPath(path, route.children);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return null;
  };
  
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  console.log(breadcrumbs)

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
      {breadcrumbs.map((item, index) => (
        <Breadcrumb.Item key={item.path}>
          {index === breadcrumbs.length - 1 ? (
            item.title
          ) : (
            <Link to={item.path}>{item.title}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default AppBreadcrumb; 
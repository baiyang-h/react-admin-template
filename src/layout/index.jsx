import React, { useState, useEffect } from 'react';
import {Outlet, useNavigate, useLocation} from "react-router";
import { useSelector } from 'react-redux';
import { selectPermissions } from '@/store/user'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AppBreadcrumb from '@/components/Breadcrumb';
import { appRoutes } from '../router'
import './index.scss'
const { Header, Sider, Content } = Layout;


// 递归生成菜单
const generateMenuItems = (routes, permissions, parentPath = '') => {
  return routes
    .filter((route) => !route.meta?.permission || permissions.includes(route.meta.permission)) // 首先看有没有permission，如果没有表示不需要权限验证则直接展示，如果有的话则过滤没有权限的菜单
    .map((route) => {
      // 1.拼接完整路径，避免多个斜杠，2.如果最后也是斜杆则也去除
      const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/').replace(/\/$/, '');
      if (route.children && route.children.length) {
        return {
          key: fullPath,
          label: route.meta?.title,
          icon: route.meta?.icon,
          children: generateMenuItems(route.children, permissions, fullPath),
        };
      }
      return {
        key: fullPath,
        label: route.meta?.title,
        icon: route.meta?.icon,
      };
    });
};

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userPermissions = useSelector(selectPermissions);  // 用户权限数据
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  const menuItems = generateMenuItems(appRoutes, userPermissions);

  // 根据当前路径设置选中的菜单项和展开的子菜单
  useEffect(() => {
    const pathname = location.pathname;
    // 设置当前选中的菜单项
    setSelectedKeys([pathname]);

    // 设置需要展开的父级菜单
    const getOpenKeys = (path) => {
      const result = [];
      let tempPath = '';
      path.split('/').forEach(item => {
        if (item) {
          tempPath += `/${item}`;
          result.push(tempPath);
        }
      });
      return result.slice(0, -1); // 去掉最后一个（当前路径）
    };
    setOpenKeys(getOpenKeys(pathname));
  }, [location.pathname]);

  // 处理子菜单展开/收起
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleMenuClick = ({ key }) => {
    console.log(key)
    navigate(key); // 路由跳转
  };

  return (
    <Layout className="app-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menuItems}
          onOpenChange={onOpenChange}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        {/* 面包屑组件 */}
        <div style={{ padding: '0 24px' }}>
          <AppBreadcrumb />
        </div>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* 渲染子路由 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
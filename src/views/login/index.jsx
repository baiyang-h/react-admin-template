import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';
import { login, selectUserLoading, getUserInfo } from '@/store/user';
import './index.css';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoading);
  const navigate = useNavigate();
  const location = useLocation()

  const onFinish = async (values) => {
    console.log('登录信息:', values);
    const form = location.state?.from
    try {
      // 登录 
      await dispatch(login(values)).unwrap();
      // 获取用户信息
      await dispatch(getUserInfo()).unwrap();
      // 登录成功后的处理
      message.success('登录成功！');
      // 登录成功后跳转到首页, 如果之前是因为某个页面突然被重定向到login，那么登录后重新回到之前的路由页面
      if(form) {
        navigate(form)
      } else {
        navigate('/');
      }
    } catch (err) {
      message.error('登录失败，请重试！');
      // 错误处理
      console.log(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>系统登录</h2>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
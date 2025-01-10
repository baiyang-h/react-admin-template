import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import './index.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // 这里添加实际的登录逻辑
      console.log('登录信息:', values);
      
      // 模拟登录成功
      message.success('登录成功！');
      // 登录成功后跳转到首页
      navigate('/');
    } catch (error) {
      message.error('登录失败，请重试！');
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
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
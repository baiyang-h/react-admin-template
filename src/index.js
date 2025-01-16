import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store';
import {ConfigProvider} from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// import 'antd/dist/reset.css'; // Ant Design 5.x 样式文件
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

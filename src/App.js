import {ConfigProvider} from "antd";
import { Routes, Route } from "react-router";
import './App.css';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';

import Layout from "./layout";
import Home from './views/home'
import Login from './views/login'
import Test from './views/test'

dayjs.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;

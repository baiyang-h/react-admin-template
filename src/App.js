import {ConfigProvider} from "antd";
import { Routes, Route } from "react-router";
import './App.css';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';

// import Home from './views/home'

dayjs.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Routes>
          {/*<Route path="home" element={<Home />} />*/}
          {/*{*/}
          {/*  constantRoutes.map(item => <Route key={item.path} path={item.path} element={item.component} />)*/}
          {/*}*/}
          {/*<Route element={<Layout />}>*/}
          {/*  <Route path="login" element={<Login />} />*/}
          {/*  <Route path="test" element={<Test />} />*/}
          {/*</Route>*/}
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;

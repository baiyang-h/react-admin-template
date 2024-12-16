import './App.css';
import {Button, ConfigProvider} from "antd";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';

dayjs.locale('zh-cn');

const handleClick = () => {
  console.log(123);
};

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Button type="primary" onClick={handleClick}>Button</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;

import { useSelector, useDispatch } from 'react-redux'
import { selectUserInfo, setUserInfo } from '@/store/user'
import { Button } from 'antd';

export default function Home() {
  const dispatch = useDispatch()
  const userInfo = useSelector(selectUserInfo);

  const handleClick = () => {
    dispatch(setUserInfo({  // 使用 dispatch 触发 action
      ...userInfo,
      username: 'aaa'
    }));
  }

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick}>Button</Button>
      <div>{ userInfo.username }</div>
    </div>
  );
}
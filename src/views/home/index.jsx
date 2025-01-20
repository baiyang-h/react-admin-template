import { useSelector } from 'react-redux'
import { selectUserInfo, setUserInfo } from '@/store/user'
import { Button } from 'antd';

export default function Home() {
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo)

  const handleClick = () => {
    console.log({
      ...userInfo,
      username: 'aaa'
    })
    setUserInfo({
      ...userInfo,
      username: 'aaa'
    })
  }

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClick}>Button</Button>
      <div>{ userInfo.username }</div>
    </div>
  );
}
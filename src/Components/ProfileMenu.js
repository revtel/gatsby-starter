import React from 'react';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Menu} from 'antd';

function ProfileMenu(props) {
  const [actions] = useOutlet('actions');
  const {activePath} = props;
  const selectedKeys = [activePath ? activePath : 'info'];

  return (
    <Menu style={{width: 256}} selectedKeys={selectedKeys} mode="inline">
      <Menu.Item key={'info'} onClick={() => navigate('/profile')}>
        個人資訊
      </Menu.Item>
      <Menu.Item key={'checkout'} onClick={() => navigate('/checkout')}>
        購物車
      </Menu.Item>
      <Menu.Item key={'orders'} onClick={() => navigate('/profile/orders')}>
        我的訂單
      </Menu.Item>
      <Menu.Item
        key={'logout'}
        onClick={() => {
          actions.logout();
          setTimeout(() => {
            navigate('/');
          }, 100);
        }}>
        登出
      </Menu.Item>
    </Menu>
  );
}

export default ProfileMenu;

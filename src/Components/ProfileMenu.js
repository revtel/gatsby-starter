import React from 'react';
import {navigate} from 'gatsby';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import {Menu, Tabs} from 'antd';
import * as User from 'rev.sdk.js/Actions/User';
import * as AppActions from '../AppActions';

function ProfileTabs(props) {
  const {activePath} = props;
  const showResetPasswordModal = useOutletSetter('reset-password-modal');

  function onTabClick(nextKey) {
    if (nextKey[0] === '/') {
      // this is a path, simply navigate to it
      console.log('DBG', nextKey);
      AppActions.navigate(nextKey);
      return;
    }

    if (nextKey === 'reset-password') {
      showResetPasswordModal({admin: false});
    } else if (nextKey === 'logout') {
      User.logout();
      setTimeout(() => {
        AppActions.navigate('/');
      }, 100);
    }
  }

  return (
    <Tabs activeKey={activePath} onChange={onTabClick} style={{margin: 10}}>
      <Tabs.TabPane key="/profile" tab="個人資訊" />
      <Tabs.TabPane key="/profile/orders" tab="我的訂單" />
      <Tabs.TabPane key="reset-password" tab="重設密碼" />
      <Tabs.TabPane key="logout" tab="登出" />
    </Tabs>
  );
}

function ProfileMenu(props) {
  const [actions] = useOutlet('actions');
  const showResetPasswordModal = useOutletSetter('reset-password-modal');
  const {activePath} = props;
  const selectedKeys = [activePath ? activePath : 'info'];

  return (
    <Menu style={{width: 256}} selectedKeys={selectedKeys} mode="inline">
      <Menu.Item key={'info'} onClick={() => navigate('/profile')}>
        個人資訊
      </Menu.Item>
      <Menu.Item key={'orders'} onClick={() => navigate('/profile/orders')}>
        我的訂單
      </Menu.Item>

      <Menu.Item
        key={'reset-password'}
        onClick={() => showResetPasswordModal({admin: false})}>
        重設密碼
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
export {ProfileTabs};

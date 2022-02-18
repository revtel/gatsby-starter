import {useOutlet, useOutletSetter} from 'reconnect.js';
import * as AppActions from '../../AppActions';
import * as User from 'rev.sdk.js/Actions/User';
import {Menu, Tabs} from 'antd';
import React from 'react';
import {navigate} from 'gatsby';

function ProfileTabs(props) {
  const showResetPasswordModal = useOutletSetter('reset-password-modal');
  const [user] = useOutlet('user');
  const {activePath} = props;

  async function onTabClick(nextKey) {
    if (nextKey[0] === '/') {
      // this is a path, simply navigate to it
      await AppActions.navigate(nextKey);
      return;
    }

    if (nextKey === 'reset-password') {
      showResetPasswordModal({admin: false});
    } else if (nextKey === 'logout') {
      await User.logout();
      setTimeout(() => {
        AppActions.navigate('/');
      }, 100);
    }
  }

  return (
    <Tabs activeKey={activePath} onChange={onTabClick}>
      <Tabs.TabPane key="/profile" tab="個人資訊" />
      <Tabs.TabPane key="/profile/orders" tab="我的訂單" />
      <Tabs.TabPane key="/profile/coupons" tab="我的優惠券" />
      {user.data?.provider === 'default' && (
        <Tabs.TabPane key="reset-password" tab="重設密碼" />
      )}
      <Tabs.TabPane key="logout" tab="登出" />
    </Tabs>
  );
}

function ProfileMenu(props) {
  const [user] = useOutlet('user');
  const showResetPasswordModal = useOutletSetter('reset-password-modal');
  const {activePath} = props;
  const selectedKeys = [activePath ? activePath : 'info'];

  return (
    <Menu style={{width: 256}} selectedKeys={selectedKeys} mode="inline">
      <Menu.Item key="info" onClick={() => navigate('/profile')}>
        個人資訊
      </Menu.Item>
      <Menu.Item key="orders" onClick={() => navigate('/profile/orders')}>
        我的訂單
      </Menu.Item>

      <Menu.Item key="coupons" onClick={() => navigate('/profile/coupons')}>
        我的優惠券
      </Menu.Item>

      {user.data?.provider === 'default' && (
        <Menu.Item
          key="reset-password"
          onClick={() => showResetPasswordModal({admin: false})}>
          重設密碼
        </Menu.Item>
      )}

      <Menu.Item
        key={'logout'}
        onClick={() => {
          User.logout();
          setTimeout(async () => {
            await navigate('/');
          }, 100);
        }}>
        登出
      </Menu.Item>
    </Menu>
  );
}

export {ProfileTabs};
export default ProfileMenu;

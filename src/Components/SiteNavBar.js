import React from 'react';
import styled from 'styled-components';
import {navigate, Link} from 'gatsby';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import {Button} from 'antd';
import useBreakpoint from '../Hooks/useBreakPoint';

function SiteNavBar(props) {
  const [user] = useOutlet('user');
  const showLoginModal = useOutletSetter('login-modal');
  const {passBreakpoint} = useBreakpoint(100);

  return (
    <NavBar
      hasBorder={passBreakpoint}
      bgColor={passBreakpoint ? 'white' : 'transparent'}
      style={{height: 64}}>
      <h2 style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
        RevtelTech
      </h2>
      <Button type="text">
        <Link to="/products">商品</Link>
      </Button>
      <Button type="text">
        <Link to="/articles">文章</Link>
      </Button>

      <div style={{flex: 1}}></div>
      {user ? (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Button onClick={() => navigate('/profile')}>Profile</Button>
        </div>
      ) : (
        <Button onClick={() => showLoginModal(true)}>LOGIN</Button>
      )}
    </NavBar>
  );
}

const NavBar = styled.div`
  position: fixed;
  background-color: ${(props) => props.bgColor};
  top: 0px;
  left: 0px;
  width: 100vw;
  height: var(--topNavBarHeight);
  padding: 16px 40px;
  display: flex;
  align-items: center;
  z-index: 1;
  box-shadow: ${(props) =>
    props.hasBorder
      ? '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
      : 'none'};
  transition: 200ms;
`;

export default SiteNavBar;

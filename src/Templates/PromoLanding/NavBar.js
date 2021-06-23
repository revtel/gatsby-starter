import React from 'react';
import {navigate} from 'gatsby';
import styled from 'styled-components';
import useBreakpoint from '../../Hooks/useBreakPoint';
import {Button} from 'antd';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import {AccountCircle} from '@styled-icons/material';

function NavBar(props) {
  const [user] = useOutlet('user');
  const showLoginModal = useOutletSetter('login-modal');
  const {passBreakpoint} = useBreakpoint(100);

  return (
    <NavBarWrapper
      hasBorder={passBreakpoint}
      bgColor={passBreakpoint ? 'white' : 'transparent'}
      style={{height: 64}}>
      <img
        src="/images/revicon_512.png"
        style={{width: 32, height: 32, objectFit: 'contain'}}
        alt="revtel logo"
      />
      <h2 style={{marginLeft: 10, color: 'orange', paddingBottom: 2}}>
        RevtelTech
      </h2>
      <div style={{flex: 1}}></div>
      {user ? (
        <AccountCircle
          size={32}
          color="orange"
          style={{cursor: 'pointer'}}
          onClick={() => navigate('/profile')}
        />
      ) : (
        <Button onClick={() => showLoginModal(true)}>登入</Button>
      )}
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  position: fixed;
  background-color: ${(props) => props.bgColor};
  top: 0px;
  left: 0px;
  width: 100vw;
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

export default NavBar;

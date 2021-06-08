import React from 'react';
import styled from 'styled-components';
import useBreakpoint from '../../Hooks/useBreakPoint';
import ActionBtn from './ActionBtn';

function NavBar(props) {
  const {passBreakpoint} = useBreakpoint(100);
  const {nav} = props;

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
      <ActionBtn
        link={nav.action}
        text={nav.actionText}
        style={{marginTop: 0}}
      />
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

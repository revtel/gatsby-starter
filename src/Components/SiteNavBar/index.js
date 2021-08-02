import React from 'react';
import styled from 'styled-components';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import {Button} from 'antd';
import useBreakpoint from '../../Hooks/useBreakPoint';
import * as AppActions from '../../AppActions';
import Link from '../NavLink';

function SiteNavBar(props) {
  const {location} = props;
  const [user] = useOutlet('user');
  const [dimension] = useOutlet('dimension');
  const showLoginModal = useOutletSetter('login-modal');
  const {passBreakpoint} = useBreakpoint(100);
  const [mobileNavVisible, setMobileNavVisible] = React.useState(false);
  const mobile = dimension.rwd !== 'desktop';
  const pathname = location?.pathname;

  React.useEffect(() => {
    setMobileNavVisible(false);
  }, [pathname]);

  return (
    <>
      <NavBar
        hasBorder={passBreakpoint}
        bgColor={passBreakpoint ? 'white' : 'transparent'}
        style={{height: 64}}>
        <Logo style={{cursor: 'pointer'}}>
          <Link to="/">
            <img src="/images/revicon_512.png" alt="site logo" />
          </Link>
        </Logo>

        {mobile && (
          <>
            <div style={{flex: 1}} />
            <Button onClick={() => setMobileNavVisible(true)}>選單</Button>
          </>
        )}

        {!mobile && (
          <>
            <Button type="text">
              <Link to="/products">商品</Link>
            </Button>
            <Button type="text">
              <Link to="/articles">文章</Link>
            </Button>

            <div style={{flex: 1}}></div>
            {user ? (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Button onClick={() => AppActions.navigate('/profile')}>
                  會員專區
                </Button>
              </div>
            ) : (
              <Button onClick={() => showLoginModal(true)}>登入</Button>
            )}
          </>
        )}
      </NavBar>

      <MobileNav
        visible={mobile && mobileNavVisible}
        setVisible={setMobileNavVisible}
      />
    </>
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;

  & img {
    width: 40px;
    object-fit: contain;
  }
`;

function MobileNav(props) {
  const [user] = useOutlet('user');
  const showLoginModal = useOutletSetter('login-modal');
  const {visible, setVisible} = props;
  return (
    <>
      <Backdrop visible={visible} onClick={() => setVisible(false)} />
      <MobileContent visible={visible}>
        <Logo
          style={{cursor: 'pointer', alignSelf: 'center', marginBottom: 20}}>
          <Link to="/">
            <img src="/images/revicon_512.png" alt="site logo" />
          </Link>
        </Logo>

        <Button style={{marginBottom: 10}}>
          <Link to="/products">商品</Link>
        </Button>
        <Button style={{marginBottom: 10}}>
          <Link to="/articles">文章</Link>
        </Button>

        {user ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button
              style={{marginBottom: 10}}
              onClick={() => AppActions.navigate('/profile')}>
              會員專區
            </Button>
          </div>
        ) : (
          <Button
            style={{marginBottom: 10}}
            onClick={() => showLoginModal(true)}>
            登入
          </Button>
        )}
      </MobileContent>
    </>
  );
}

const Backdrop = styled.div`
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  ${(props) =>
    !props.visible &&
    `
    pointer-events: none;
  `}
  transition: 300ms;
`;

const MobileContent = styled.div`
  z-index: 101;
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? 'translateX(0px)' : 'translateX(-300px)'};
  ${(props) =>
    !props.visible &&
    `
    pointer-events: none;
  `}
  transition: 300ms;

  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export default SiteNavBar;

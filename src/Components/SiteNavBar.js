import React from 'react';
import styled from 'styled-components';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import {Badge, Button} from 'antd';
import useBreakpoint from '../Hooks/useBreakPoint';
import Link from './NavLink';
import * as AppActions from '../AppActions';
import {ShoppingBag} from '@styled-icons/boxicons-regular/ShoppingBag';
import {PersonCircle} from '@styled-icons/ionicons-outline/PersonCircle';
import {MailOutline as Mail} from '@styled-icons/material-rounded/MailOutline';

import * as Scroll from 'react-scroll';

const navItems = [];

function _isInPath({location = {}, navItemUrl}) {
  if (navItemUrl === '/articles?cat=news') {
    if (location.pathname === '/articles' && location.search === '?cat=news') {
      // workaround for special case '/articles?cat=news'
      return true;
    } else {
      return false;
    }
  } else {
    if (location.search === '?cat=news') {
      return false;
    }
    return location.pathname?.indexOf(navItemUrl) === 0;
  }
}

function SiteNavBar(props) {
  const {location} = props;
  const [user] = useOutlet('user');
  const [cart] = useOutlet('cart');
  const [dimension] = useOutlet('dimension');
  const showLoginModal = useOutletSetter('login-modal');
  const {passBreakpoint} = useBreakpoint(100);
  const [mobileNavVisible, setMobileNavVisible] = React.useState(false);
  const mobile = dimension.rwd !== 'desktop';
  const pathname = location?.pathname;
  const isSimple = props.isSimple;

  React.useEffect(() => {
    setMobileNavVisible(false);
  }, [pathname]);

  return (
    <>
      <NavBar
        hasBorder={passBreakpoint}
        bgColor={'#F4F5F2'}
        style={{height: 64}}>
        <Logo style={{cursor: 'pointer'}}>
          <a href="https://www.revtel.tech" target="_blank" rel="noreferrer">
            <img
              src={
                dimension.rwd === 'desktop'
                  ? '/images/RevtelTechLogo-long.png'
                  : '/images/revicon_512.png'
              }
              alt="Logo"
              style={{
                height: 40,
                objectFit: 'contain',
              }}
            />
          </a>
        </Logo>

        {!isSimple && (
          <>
            <div
              style={{
                marginLeft: 20,
                cursor: 'pointer',
                color: '#B3541E',
              }}
              onClick={() => {
                Scroll.scroller.scrollTo('service', {
                  duration: 1500,
                  delay: 100,
                  smooth: 'easeInOutQuint',
                  offset: -100,
                });
              }}>
              {dimension.rwd === 'desktop' ? '應用情境' : '情境'}
            </div>

            <div
              style={{
                marginLeft: mobile ? 10 : 20,
                cursor: 'pointer',
                color: '#B3541E',
              }}
              onClick={() => {
                Scroll.scroller.scrollTo('types', {
                  duration: 1500,
                  delay: 100,
                  smooth: 'easeInOutQuint',
                  offset: -100,
                });
              }}>
              {dimension.rwd === 'desktop' ? '合作方式' : '收費'}
            </div>

            <div
              style={{
                marginLeft: mobile ? 10 : 20,
                cursor: 'pointer',
                color: '#B3541E',
              }}
              onClick={() => {
                Scroll.scroller.scrollTo('good', {
                  duration: 1500,
                  delay: 100,
                  smooth: 'easeInOutQuint',
                  offset: -100,
                });
              }}>
              {dimension.rwd === 'desktop' ? '方案優勢' : '優勢'}
            </div>

            <div
              style={{
                marginLeft: mobile ? 10 : 20,
                cursor: 'pointer',
                color: '#B3541E',
              }}
              onClick={() => {
                Scroll.scroller.scrollTo('cases', {
                  duration: 1500,
                  delay: 100,
                  smooth: 'easeInOutQuint',
                  offset: -100,
                });
              }}>
              {dimension.rwd === 'desktop' ? '成功案例' : '案例'}
            </div>

            <div
              style={{
                marginLeft: mobile ? 10 : 20,
                cursor: 'pointer',
                color: '#B3541E',
              }}
              onClick={() => {
                Scroll.scroller.scrollTo('concept', {
                  duration: 1500,
                  delay: 100,
                  smooth: 'easeInOutQuint',
                  offset: -100,
                });
              }}>
              {dimension.rwd === 'desktop' ? '顧問觀點' : '觀點'}
            </div>
          </>
        )}

        <div style={{flex: 1}} />
        <Mail
          size={mobile ? '32' : '36'}
          color="#3E54AC"
          onClick={() =>
            Scroll.scroller.scrollTo('contact', {
              duration: 1500,
              delay: 100,
              smooth: 'easeInOutQuint',
              offset: -100,
            })
          }
          style={{cursor: 'pointer'}}
        />
      </NavBar>
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
  z-index: 10;
  /* box-shadow: ${(props) =>
    props.hasBorder
      ? '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
      : 'none'}; */
  transition: 200ms;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

function MobileNav(props) {
  const [user] = useOutlet('user');
  const showLoginModal = useOutletSetter('login-modal');
  const {visible, setVisible, location} = props;
  return (
    <>
      <Backdrop visible={visible} onClick={() => setVisible(false)} />
      <MobileContent visible={visible}>
        <Logo
          style={{cursor: 'pointer', alignSelf: 'center', marginBottom: 20}}>
          <Link to="/">
            <img
              src="/images/revicon_512.png"
              alt="site logo"
              style={{width: 150}}
            />
          </Link>
        </Logo>
        {navItems.map(({children, url}, idx) => {
          let selected = _isInPath({
            location,
            navItemUrl: url,
          });

          let loading = true;
          if (url === '/about') {
            loading = 800;
          }

          return (
            <Link
              to={url}
              loading={loading}
              className="nav-link"
              key={idx}
              extraStyle={{
                color: selected ? '#0eb407' : '#000',
                fontWeight: '400',
                padding: '19px 10px',
                textAlign: 'center',
              }}>
              {children}
            </Link>
          );
        })}

        {user ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button
              style={{marginBottom: 10}}
              onClick={() => AppActions.navigate('/profile')}>
              會員專區
            </Button>
          </div>
        ) : (
          <Button style={{marginTop: 40}} onClick={() => showLoginModal(true)}>
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

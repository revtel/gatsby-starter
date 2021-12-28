import React from 'react';
import styled from 'styled-components';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import {Badge, Button} from 'antd';
import useBreakpoint from '../Hooks/useBreakPoint';
import Link from './NavLink';
import * as AppActions from '../AppActions';
import {ShoppingBag} from '@styled-icons/boxicons-regular/ShoppingBag';
import {PersonCircle} from '@styled-icons/ionicons-outline/PersonCircle';

const navItems = [
  {children: '品牌介紹', url: '/about'},
  {children: '最新消息', url: '/articles?cat=news'},
  {children: '商品項目', url: '/products'},
  {children: '部落格', url: '/articles'},
  {children: '購物車', url: '/checkout'},
  {children: '會員專區', url: '/profile'},
];

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
  React.useEffect(() => {
    setMobileNavVisible(false);
  }, [pathname]);

  return (
    <>
      <NavBar hasBorder={passBreakpoint} bgColor={'white'} style={{height: 64}}>
        <Logo style={{cursor: 'pointer'}}>
          <Link to="/" loading={800}>
            <img
              src="/favicon.png"
              alt="Logo"
              style={{
                height: dimension.rwd === 'desktop' ? 40 : 20,
                objectFit: 'contain',
              }}
            />
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
            <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
              {navItems.map(({children, url}, idx) => {
                let selected = _isInPath({
                  location,
                  navItemUrl: url,
                });

                let loading = true;
                if (url === '/about') {
                  loading = 800;
                }

                if (url === '/profile' || url === '/checkout') {
                  return null;
                }

                return (
                  <Link
                    to={url}
                    loading={loading}
                    className="nav-link"
                    key={idx}
                    extraStyle={{
                      color: '#000',
                      fontWeight: '400',
                      borderBottom: selected
                        ? '4px solid #AFAFA4'
                        : '4px solid transparent',
                      padding: '19px 10px',
                      margin: '0px 20px',
                    }}>
                    {children}
                  </Link>
                );
              })}
            </div>

            <Button
              type="link"
              onClick={() => {
                AppActions.navigate('/checkout');
              }}>
              <Badge count={cart.items.length}>
                <ShoppingBag size={24} color={'#000000'} />
              </Badge>
            </Button>

            {user ? (
              <Button
                type="link"
                onClick={() => {
                  AppActions.navigate('/profile');
                }}>
                <PersonCircle size={26} color={'#000000'} />
              </Button>
            ) : (
              <Button onClick={() => showLoginModal(true)}>登入</Button>
            )}
          </>
        )}
      </NavBar>

      <MobileNav
        visible={mobile && mobileNavVisible}
        setVisible={setMobileNavVisible}
        location={location}
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
          <Link to="/" loading={800}>
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
          if (url === '/about' || '/profile') {
            loading = 800;
          }

          if (!user && url === '/profile') {
            return null;
          }

          return (
            <Link
              to={url}
              loading={loading}
              className="nav-link"
              key={idx}
              extraStyle={{
                color: selected ? '#AFAFA4' : '#000',
                fontWeight: '400',
                padding: '19px 10px',
                textAlign: 'center',
              }}>
              {children}
            </Link>
          );
        })}

        {!user && (
          <div
            style={{padding: '19px 10px', textAlign: 'center'}}
            onClick={() => showLoginModal(true)}>
            登入
          </div>
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

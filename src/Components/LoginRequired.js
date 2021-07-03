import React from 'react';
import {getOutlet, useOutletSetter} from 'reconnect.js';
import styled from 'styled-components';
import {Button} from 'antd';
import SiteNavBar from './SiteNavBar';

function LoginRequired(props) {
  const {admin} = props;
  const showLoginModal = useOutletSetter('login-modal');
  return (
    <>
      <SiteNavBar />
      <Wrapper>
        <h1>Login Required</h1>
        <Button onClick={() => showLoginModal({admin})}>LOGIN</Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-80px);
`;

function isAdmin(user) {
  const allowed = ['admin', 'management'];
  for (const grp of allowed) {
    if (user.grp.indexOf(grp) > -1) {
      return true;
    }
  }
  return false;
}

function withLoginRequired(NextComp, admin = false) {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this._unregister = getOutlet('user').register(() => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this._unregister();
    }

    render() {
      const user = getOutlet('user').getValue();

      console.log(user);

      if (user) {
        if (!admin || (admin && isAdmin(user))) {
          return <NextComp user={user} {...this.props} />;
        }
      }

      return <LoginRequired admin={admin} />;
    }
  }

  Wrapper.displayName = NextComp.displayName;

  return Wrapper;
}

export default LoginRequired;
export {withLoginRequired};

import React from 'react';
import {getOutlet, useOutletSetter} from 'reconnect.js';
import styled from 'styled-components';
import {Button} from 'antd';

function LoginRequired(props) {
  const showLoginModal = useOutletSetter('login-modal');
  return (
    <Wrapper>
      <h1>Login Required</h1>
      <Button onClick={() => showLoginModal(true)}>LOGIN</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function withLoginRequired(NextComp) {
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

      if (user) {
        return <NextComp user={user} {...this.props} />;
      }

      return <LoginRequired />;
    }
  }

  Wrapper.displayName = NextComp.displayName;

  return Wrapper;
}

export default LoginRequired;
export {withLoginRequired};

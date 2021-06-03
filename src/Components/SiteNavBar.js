import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';

function SiteNavBar(props) {
  const [user] = useOutlet('user');

  return (
    <Wrapper>
      <div className="content">
        <h2 onClick={() => navigate('/')}>RevtelTech</h2>
        <div style={{flex: 1}} />
        {user && <Button onClick={() => navigate('/profile')}>Profile</Button>}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  background-color: white;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: var(--topNavBarHeight);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 200ms;
  z-index: 1;

  & > .content {
    max-width: var(--contentMaxWith);
    margin: 0 auto;
    padding: var(--basePadding);
    display: flex;
    align-items: center;
  }
`;

export default SiteNavBar;

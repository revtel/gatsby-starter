import React from 'react';
import styled from 'styled-components';

function Settings(props) {
  return (
    <Wrapper>
      <h1>我的設定</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;

  & > h1 {
    font-size: 32px;
  }
`;

export default Settings;

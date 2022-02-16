import React from 'react';
import styled from 'styled-components';

function BrowserHeader() {
  return (
    <Wrapper>
      <img src="/pokemon-logo.png" alt="logo" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-image: url('/header_bg.jpg');
  background-size: contain;
  animation: move 20s linear infinite;
  & img {
    height: 100px;
    transform: scale(2.5);
  }
  @keyframes move {
    from {
      background-position: left bottom;
    }
    to {
      background-position: -200px bottom;
    }
  }
`;
export default BrowserHeader;

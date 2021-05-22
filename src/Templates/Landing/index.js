import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import * as Ant from 'antd';
import ReactLogo from '../../Components/ReactLogo';

function Landing(props) {
  return (
    <Wrapper>
      <ReactLogo />
      <h2>Landing Page</h2>
      <Ant.Button type="primary" onClick={() => navigate('/test')}>
        Go To Test
      </Ant.Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

export default Landing;

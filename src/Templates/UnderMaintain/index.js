import React from 'react';
import styled from 'styled-components';
import {Button, Result} from 'antd';

const UnderMaintainPage = () => {
  return (
    <StyledUnderMaintainPage>
      <Result status="warning" title="系統維修中，請稍後再嘗試" />
    </StyledUnderMaintainPage>
  );
};

const StyledUnderMaintainPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: grid;
  place-items: center;
  z-index: 1000;
`;

export default UnderMaintainPage;

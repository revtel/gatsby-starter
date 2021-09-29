import React from 'react';
import styled from 'styled-components';
import {Chat} from '@styled-icons/crypto/Chat';

function Fab(props) {
  const {fab} = props;

  if (!fab) {
    return null;
  }

  function onFabClick() {
    if (fab.action) {
      window.open(fab.action, '_blank');
    }
  }

  return (
    <Wrapper>
      <Btn color={fab.color} onClick={onFabClick} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
`;

const Btn = styled(Chat)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
  cursor: pointer;
  color: ${(props) => props.color || 'orange'};
  background-color: transparent;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 4px 4px rgba(0, 0, 0, 0.23);
  &:active {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export default Fab;

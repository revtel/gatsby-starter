import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {LoaderAlt} from '@styled-icons/boxicons-regular/LoaderAlt';

function ActivityIndicator(props) {
  const [visible] = useOutlet('loading');

  return (
    <>
      <Wrapper visible={visible}>
        <div className="spinner">
          <img
            className="logo"
            src="/loading.gif"
            alt="Logo"
            style={{
              width: '180px',
              height: '120px',
              objectFit: 'cover',
            }}
          />
        </div>
      </Wrapper>

      <Backdrop visible={visible} />
    </>
  );
}

const CoverAll = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
`;

const Wrapper = styled(CoverAll)`
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  & > .spinner {
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: 200ms;
    opacity: ${(props) => (props.visible ? 1 : 0)};
  }
`;

const Backdrop = styled(CoverAll)`
  z-index: 9999;
  transition: 200ms;
  background-color: ${(props) =>
    props.visible ? 'rgba(0,0,0,0.5)' : 'transparent'};
`;

export default ActivityIndicator;

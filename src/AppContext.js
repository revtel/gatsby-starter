import React from 'react';
import {getOutlet} from 'reconnect.js';
import './App';
import ActivityIndicator from './Components/ActivityIndicator';
import LoginModal from './Components/LoginModal';

const Dimension = getOutlet('dimension', {rwd: 'mobile'}, {autoDelete: false});

function Provider(props) {
  const detectDimension = React.useCallback(() => {
    const nextDimension = {};
    if (typeof window !== undefined) {
      nextDimension.innerWidth = window.innerWidth;
      nextDimension.innerHeight = window.innerHeight;
      if (window.innerWidth <= 768) {
        nextDimension.rwd = 'mobile';
      } else {
        nextDimension.rwd = 'desktop';
      }
      Dimension.update(nextDimension);
    }
  }, []);

  const onResize = React.useCallback(() => {
    detectDimension();
  }, [detectDimension]);

  React.useEffect(() => {
    try {
      detectDimension();
      if (typeof window !== undefined) {
        window.addEventListener('resize', onResize);
      }
      return () => {
        if (typeof window !== undefined) {
          window.removeEventListener('resize', onResize);
        }
      };
    } catch (ex) {
      console.warn('Provider:useEffect', ex);
    }
  }, [onResize, detectDimension]);

  React.useEffect(() => {
    console.log('AppCtx effect hook');
    async function onCtxRendered() {
      try {
        await getOutlet('actions').getValue().autoLogin();
      } catch (ex) {
        console.log('autoLogin ex', ex);
      }
    }

    onCtxRendered();
  }, []);

  console.log('AppCtx rendered');

  return (
    <>
      {props.children}

      <LoginModal />
      <ActivityIndicator />
    </>
  );
}

export {Provider};

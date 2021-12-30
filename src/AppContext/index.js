import React from 'react';
import {getOutlet} from 'reconnect.js';
import ActivityIndicator from '../Components/ActivityIndicator';
import LoginModal from 'rev.sdk.js/Components/LoginModal';
import ContactModal from '../Components/ContactModal';
import ResetPasswordModal from '../Components/ResetPasswordModal';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import {buildCatDisplayMap} from '../Utils/buildCatDisplayMap';

function Provider(props) {
  const Dimension = getOutlet('dimension');
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
  }, [Dimension]);

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

  async function getSiteConfig(name) {
    const [first] = await JStorage.fetchDocuments(
      'site',
      {
        name,
      },
      null,
      null,
    );
    return first;
  }

  React.useEffect(() => {
    console.log('AppCtx effect hook');
    async function onCtxRendered() {
      const categories = JSON.parse(
        (await getSiteConfig('product_category')).value,
      );
      getOutlet('categories').update(categories);
      getOutlet('categoryDisplayMap').update(buildCatDisplayMap(categories));
    }
    onCtxRendered();
  }, []);

  console.log('AppCtx rendered');

  return (
    <>
      {props.children}

      <LoginModal />
      <ContactModal />
      <ResetPasswordModal />
      <ActivityIndicator />
    </>
  );
}

export {Provider};

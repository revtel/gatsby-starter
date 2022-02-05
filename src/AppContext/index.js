import React from 'react';
import {getOutlet} from 'reconnect.js';
import LoginModal from 'rev.sdk.js/Components/LoginModal';
import ResetPasswordModal from '../Components/ResetPasswordModal';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import {buildCatDisplayMap} from '../Utils/buildCatDisplayMap';
import Spinner from 'rev.sdk.js/Components/Spinner';
import LoadingGif from '../../static/loading.gif';

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

  React.useEffect(() => {
    console.log('AppCtx effect hook');
    function onCtxRendered() {
      const PRODUCT_CATEGORY_IN_SESSION_STORAGE = JSON.parse(
        window.sessionStorage.getItem('categories'),
      );
      const ARTICLE_CATEGORY_IN_SESSION_STORAGE = JSON.parse(
        window.sessionStorage.getItem('articleCategories'),
      );

      if (
        // PRODUCT_CATEGORY_IN_SESSION_STORAGE &&
        // ARTICLE_CATEGORY_IN_SESSION_STORAGE
        false
      ) {
        getOutlet('categories').update(PRODUCT_CATEGORY_IN_SESSION_STORAGE);
        getOutlet('categoryDisplayMap').update(
          buildCatDisplayMap(PRODUCT_CATEGORY_IN_SESSION_STORAGE),
        );
        getOutlet('articleCategories').update(
          ARTICLE_CATEGORY_IN_SESSION_STORAGE,
        );
        getOutlet('articleCategoryDisplayMap').update(
          buildCatDisplayMap(ARTICLE_CATEGORY_IN_SESSION_STORAGE),
        );
      } else {
        JStorage.fetchDocuments('site', {}, null, null).then((configs) => {
          for (const cfg of configs) {
            if (cfg.name === 'product_category') {
              getOutlet('categories').update(cfg.categories || []);
              getOutlet('categoryDisplayMap').update(
                buildCatDisplayMap(cfg.categories || []),
              );
              window.sessionStorage.setItem(
                'categories',
                JSON.stringify(cfg.categories || []),
              );
            } else if (cfg.name === 'article_category') {
              getOutlet('articleCategories').update(cfg.categories || []);
              getOutlet('articleCategoryDisplayMap').update(
                buildCatDisplayMap(cfg.categories || []),
              );
              window.sessionStorage.setItem(
                'articleCategories',
                JSON.stringify(cfg.categories || []),
              );
            }
          }
        });
      }
    }
    onCtxRendered();
  }, []);

  console.log('AppCtx rendered');

  return (
    <>
      {props.children}
      <LoginModal
        canFacebookLogin={true}
        canLineLogin={true}
        canGoogleLogin={true}
        canForgetPassword={true}
        canRegister={true}
        onForgotPasswordClick={null}
        onRegisterClick={null}
      />
      <ResetPasswordModal />
      <Spinner
        imageUrl={LoadingGif}
        spinnerStyle={{animation: 'unset', width: 150, height: 150}}
        style={{backgroundColor: 'transparent'}}
      />
    </>
  );
}

export {Provider};

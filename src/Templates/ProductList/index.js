import React from 'react';
import ProductGrid from './ProductGrid';
import ProductListPage from 'rev.sdk.js/Templates/ProductList';
import * as AppActions from '../../AppActions';

function ProductList(props) {
  let onCustomClick = (item) => {
    if (props.location.pathname.indexOf('/products') > -1) {
      AppActions.navigate(`/product?id=${item.id}`, {loading: true});
    } else if (props.location.pathname.indexOf('/articles') > -1) {
      AppActions.navigate(`/article?id=${item.id}`, {loading: true});
    }
  };

  function renderCustomSection({route, sectionId, params}) {
    if (route === '/articles') {
      if (sectionId === 'A') {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              backgroundImage: 'url(/header_bg.jpg)',
              backgroundSize: 'contain',
              animation: 'navMove 20s linear infinite',
            }}>
            <img
              src="/pokemon-logo.png"
              alt="logo"
              style={{height: 100, transform: 'scale(2.5)'}}
            />
          </div>
        );
      }

      if (['B', 'C', 'E'].indexOf(sectionId) > -1) {
        return null;
      }
    } else if (route === '/products') {
      if (['B', 'C', 'E', 'F', 'G', 'H', 'J'].indexOf(sectionId) > -1) {
        return null;
      }

      if (sectionId === 'A') {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              backgroundImage: 'url(/header_bg.jpg)',
              backgroundSize: 'contain',
              animation: 'navMove 20s linear infinite',
            }}>
            <img
              src="/pokemon-logo.png"
              alt="logo"
              style={{height: 100, transform: 'scale(2.5)'}}
            />
          </div>
        );
      }
    }
  }

  return (
    <div style={{maxWidth: 'var(--contentMaxWidth)', margin: '0 auto'}}>
      <ProductListPage
        {...props}
        ProductGrid={ProductGrid}
        onCustomClick={onCustomClick}
        renderCustomSection={renderCustomSection}
      />
    </div>
  );
}

export default ProductList;

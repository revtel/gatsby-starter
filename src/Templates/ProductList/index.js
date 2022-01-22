import React from 'react';
import ProductGrid from './ProductGrid';
import ProductListPage from 'rev.sdk.js/Templates/ProductList';
import * as AppActions from '../../AppActions';
import BrowserHeader from '../../Components/BrowseHeader';

function ProductList(props) {
  let onCustomClick = async (item) => {
    if (props.location.pathname.indexOf('/products') > -1) {
      await AppActions.navigate(`/product?id=${item.id}`, {loading: true});
    } else if (props.location.pathname.indexOf('/articles') > -1) {
      await AppActions.navigate(`/article?id=${item.id}`, {loading: true});
    }
  };

  function renderCustomSection({route, sectionId, params}) {
    if (route === '/articles') {
      if (sectionId === 'A') {
        return <BrowserHeader />;
      }

      if (['B', 'C', 'E'].indexOf(sectionId) > -1) {
        return null;
      }
    } else if (route === '/products') {
      if (['B', 'C', 'E', 'F', 'G', 'H', 'J'].indexOf(sectionId) > -1) {
        return null;
      }

      if (sectionId === 'A') {
        return <BrowserHeader />;
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

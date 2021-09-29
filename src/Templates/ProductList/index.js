import React from 'react';
import ProductGrid from './ProductGrid';
import ProductListPage from 'rev.sdk.js/Templates/ProductList';
import * as AppActions from '../../AppActions';

function ProductList(props) {
  let onCustomClick = (item) => {
    if (props.location.pathname === '/products') {
      AppActions.navigate(`/product?id=${item.id}`, {loading: true});
    } else if (props.location.pathname === '/articles') {
      AppActions.navigate(`/article?id=${item.id}`, {loading: true});
    }
  };
  return (
    <ProductListPage
      {...props}
      ProductGrid={ProductGrid}
      onCustomClick={onCustomClick}
    />
  );
}

export default ProductList;

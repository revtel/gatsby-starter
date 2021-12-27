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
              backgroundImage:
                'url(https://t3.ftcdn.net/jpg/02/93/11/46/360_F_293114646_6uJj1Sp1eLkIOebm9QL0Y18dzOt5eZtb.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <h2>Article List Custom Area</h2>
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
              backgroundImage:
                'url(https://t3.ftcdn.net/jpg/02/93/11/46/360_F_293114646_6uJj1Sp1eLkIOebm9QL0Y18dzOt5eZtb.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <h2>Product List Custom Area</h2>
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

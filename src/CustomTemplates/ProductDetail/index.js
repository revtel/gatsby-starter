import React from 'react';
import ProductDetail from '../../Templates/ProductDetail';

function CustomProductDetail(props) {
  function renderCustomSection(sectionId, {product}) {
    // sample code
    // if (sectionId === 'A') {
    //   return (
    //     <div>
    //       {sectionId}
    //       {JSON.stringify(product)}
    //     </div>
    //   );
    // }

    return null;
  }

  return <ProductDetail renderCustomSection={renderCustomSection} {...props} />;
}

export default CustomProductDetail;

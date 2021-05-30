import React from 'react';

function renderCustomSection(props) {
  const {route, sectionId, params, data} = props;

  if (route === '/products') {
    return (
      <section
        style={{padding: 40, backgroundColor: '#ccc', border: '3px solid red'}}>
        <h2 style={{textAlign: 'center'}}>{`CustomSection ${sectionId}`}</h2>
      </section>
    );
  }

  if (route === '/product') {
    if (sectionId === 'C') {
      const {product} = data;
      return (
        <section
          style={{
            padding: 40,
            backgroundColor: '#ccc',
            border: '3px solid red',
          }}>
          <h2
            style={{
              textAlign: 'center',
            }}>{`Product ${product.id} Is Awesome!!`}</h2>
        </section>
      );
    }
    return (
      <section
        style={{padding: 40, backgroundColor: '#ccc', border: '3px solid red'}}>
        <h2 style={{textAlign: 'center'}}>{`CustomSection ${sectionId}`}</h2>
      </section>
    );
  }

  return null;
}

export {renderCustomSection};

import React from 'react';
import {Steps} from 'antd';

function renderCustomSection(props) {
  const {route, sectionId, params, data} = props;

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

  if (route.indexOf('/checkout') === 0) {
    const subRoute = route.split('/')[2];
    let current = 0;

    if (subRoute === 'info') {
      current = 1;
    } else if (subRoute === 'review') {
      current = 2;
    }

    if (sectionId === 'B') {
      return (
        <Steps current={current} style={{marginBottom: 20}}>
          <Steps.Step title="購物車" />
          <Steps.Step title="結帳資訊" />
          <Steps.Step title="付款" />
        </Steps>
      );
    }

    return null;
  }

  return (
    <section
      style={{padding: 40, backgroundColor: '#ccc', border: '3px solid red'}}>
      <h2 style={{textAlign: 'center'}}>{`CustomSection ${sectionId}`}</h2>
    </section>
  );
}

export {renderCustomSection};

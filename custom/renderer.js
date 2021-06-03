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

  if (route === '/cart') {
    if (sectionId === 'B') {
      return (
        <Steps current={0} style={{marginBottom: 20}}>
          <Steps.Step title="購物車" />
          <Steps.Step title="寄送資訊" />
          <Steps.Step title="付款" />
        </Steps>
      );
    }
  }

  return (
    <section
      style={{padding: 40, backgroundColor: '#ccc', border: '3px solid red'}}>
      <h2 style={{textAlign: 'center'}}>{`CustomSection ${sectionId}`}</h2>
    </section>
  );
}

export {renderCustomSection};

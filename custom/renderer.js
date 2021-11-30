import React from 'react';
import {Steps} from 'antd';
import {getOutlet} from 'reconnect.js';

function renderCustomSection(props) {
  const {route, sectionId, params, data} = props;
  const dimension = getOutlet('dimension');

  if (route === '/products') {
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

  if (route === '/product') {
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
          <h2>Product Detail Custom Area</h2>
        </div>
      );
    }

    if (['F', 'G'].indexOf(sectionId) === -1) {
      return null;
    }
  }

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
  }

  if (route === '/article') {
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
          <h2>Article Detail Custom Area</h2>
        </div>
      );
    }

    if (['B', 'D'].indexOf(sectionId) > -1) {
      return null;
    }
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
        <Steps
          direction={
            dimension.getValue().rwd === 'mobile' ? 'vertical' : 'horizontal'
          }
          type="navigation"
          current={current}
          style={{marginBottom: 20}}>
          <Steps.Step title="購物車" />
          <Steps.Step title="寄送資訊" />
          <Steps.Step title="付款" />
        </Steps>
      );
    }
  }

  return null;
}

function renderCustomComponent(props) {
  const {name, data} = props;

  if (name === 'CART_CUSTOM_COLUMN') {
    if (data.item.product.labels?.includes('custom')) {
      return <div />;
    } else {
      return null;
    }
  }
  return null;
}

export {renderCustomSection, renderCustomComponent};

import React from 'react';
import {Button, Image, Steps} from 'antd';

function renderCustomSection(props) {
  const {route, sectionId, params, data} = props;

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
        <Steps type="navigation" current={current} style={{marginBottom: 20}}>
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
      return (
        <div>
          <Image
            src={data.item.config.image || ''}
            fallback="https://www.taiwang-puzzle.com/image/cache/catalog/%E5%AE%A2%E8%A3%BD%E8%B4%88%E7%A6%AE%E5%93%81%E6%8B%BC%E5%9C%96/cp-0020-500x500.jpg"
          />
          <Button
            style={{width: '100%'}}
            onClick={async () => {
              const image = await fetch(data.item.config.image);
              const imageBlog = await image.blob();
              const imageURL = URL.createObjectURL(imageBlog);
              const link = document.createElement('a');
              link.href = imageURL;
              link.download = 'image';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
            下載
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }
  return null;
}

export {renderCustomSection, renderCustomComponent};

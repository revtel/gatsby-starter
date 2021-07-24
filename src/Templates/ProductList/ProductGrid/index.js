import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';

function ProductGrid(props) {
  const {products, onItemClick} = props;
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.rwd === 'mobile';
  return (
    <Wrapper mobile={mobile}>
      {products.map((product, i) => (
        <ProductItem
          key={i}
          mobile={mobile}
          product={product}
          onClick={(evt) => onItemClick(product, evt)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.mobile ? 'center' : 'space-between')};
  padding: ${(props) => (props.mobile ? 0 : 'var(--basePadding)')};
`;

function ProductItem(props) {
  const {product, onClick, mobile} = props;

  return (
    <ItemWrapper mobile={mobile} onClick={onClick}>
      {product.images && product.images[0] && (
        <img src={product.images[0]} alt="product" />
      )}

      <div className="info">
        <h3 style={{color: 'white'}}>{product.name}</h3>
        <p style={{textAlign: 'right'}}>${product.price}</p>
      </div>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  background-color: #eee;
  margin: 10px;
  width: ${(props) => (props.mobile ? '120px' : '180px')};
  height: ${(props) => (props.mobile ? '180px' : '240px')};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  & > .info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 6px 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.66);
  }

  & > img:first-child {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 200ms;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export default ProductGrid;

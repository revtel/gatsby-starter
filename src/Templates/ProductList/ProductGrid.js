import React from 'react';
import styled from 'styled-components';

function ProductGrid(props) {
  const {products} = props;
  return (
    <Wrapper>
      {products.map((product, i) => (
        <Item key={i}>
          <h3>{product.name}</h3>
        </Item>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: var(--basePadding);
`;

const Item = styled.div`
  background-color: #eee;
  margin: 10px;
  padding: 10px;
  width: 180px;
  height: 240px;
`;

export default ProductGrid;

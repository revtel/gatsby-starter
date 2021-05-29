import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';

function ProductGrid(props) {
  const {products} = props;
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.rwd === 'mobile';
  return (
    <Wrapper mobile={mobile}>
      {products.map((product, i) => (
        <Item key={i} mobile={mobile}>
          <h3>{product.name}</h3>
        </Item>
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

const Item = styled.div`
  background-color: #eee;
  margin: 10px;
  padding: 10px;
  width: ${(props) => (props.mobile ? '120px' : '180px')};
  height: ${(props) => (props.mobile ? '180px' : '240px')};
`;

export default ProductGrid;

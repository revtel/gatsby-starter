import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import empty from '../../../../static/favicon.png';
import moment from 'moment';
import {Tag} from 'antd';

function ProductGrid(props) {
  const {products, onItemClick, prefixPath} = props;
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.rwd === 'mobile';
  if (prefixPath.indexOf('products') >= 0) {
    return (
      <ProductGridWrapper mobile={mobile}>
        {products.map((product, i) => (
          <ProductItem
            key={i}
            mobile={mobile}
            product={product}
            onClick={(evt) => onItemClick(product, evt)}
          />
        ))}
        {new Array(products.length).fill(0).map((item, key) => (
          <div className="filler" key={key} />
        ))}
      </ProductGridWrapper>
    );
  } else if (prefixPath.indexOf('articles') >= 0) {
    return (
      <ArticleGridWrapper mobile={mobile}>
        {products.map((product, i) => (
          <ArticleItem
            key={i}
            mobile={mobile}
            product={product}
            onClick={(evt) => onItemClick(product, evt)}
          />
        ))}
      </ArticleGridWrapper>
    );
  } else if (prefixPath.indexOf('news') >= 0) {
    return (
      <ArticleGridWrapper mobile={mobile}>
        {products.map((product, i) => (
          <ArticleItem
            key={i}
            mobile={mobile}
            product={product}
            onClick={(evt) => onItemClick(product, evt)}
          />
        ))}
      </ArticleGridWrapper>
    );
  }
}

const ProductGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.mobile ? 'center' : 'space-between')};
  padding: ${(props) => (props.mobile ? 0 : 'var(--basePadding)')};

  & > .filler {
    width: ${(props) => (props.mobile ? '140px' : '180px')};
    height: 1px;
    margin: 10px;
  }
`;

const ArticleGridWrapper = styled.div`
  align-self: ${(props) => (props.mobile ? 'center' : 'space-between')};
  padding: ${(props) => (props.mobile ? 0 : 'var(--basePadding)')};
`;

function ProductItem(props) {
  const {product, onClick, mobile} = props;
  const [categories] = useOutlet('categories');
  const attributes =
    categories?.[0].items.map((attr) => ({
      ...attr,
      name: attr.name.slice(6, attr.name.length),
    })) || [];

  const src = useMemo(() => {
    try {
      return product.images[0].expected_url;
    } catch (e) {
      return null;
    }
  }, [product.images]);

  return (
    <ProductWrapper mobile={mobile} onClick={onClick}>
      <div>
        {product.attribute.sort().map((attr, index) => (
          <Tag
            key={index}
            color={attributes.find((a) => a.name === attr).color}>
            {attributes.find((a) => a.name === attr).display}
          </Tag>
        ))}
      </div>
      <img src={src || empty} alt="product" />

      <div className="info">
        <h3>{product.name}</h3>
        {product.price !== undefined && (
          <p style={{textAlign: 'right'}}>${product.price}</p>
        )}
      </div>
    </ProductWrapper>
  );
}

function ArticleItem(props) {
  const {product, onClick, mobile} = props;
  return (
    <ArticleWrapper mobile={mobile} onClick={onClick}>
      <img src={product.image || '../../images/empty-img.png'} alt="article" />

      <div className="info">
        <h3 className="title">{product.title || '無標題'}</h3>
        <p className="date">
          {moment(product.created).format('YYYY / MM / DD HH : mm : ss') || ''}
        </p>
      </div>
    </ArticleWrapper>
  );
}

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  max-width: ${(props) => (props.mobile ? '80%' : 'none')};
  margin: ${(props) => (props.mobile ? '0 auto' : 'unset')};
  margin-top: 30px;
  cursor: pointer;

  & > .info {
    padding: ${(props) => (props.mobile ? 'unset' : '0 20px')};
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      letter-spacing: 4px;
      line-height: 1.57;
    }

    //& > .outline {
    //  display: -webkit-box;
    //  -webkit-line-clamp: 3;
    //  -webkit-box-orient: vertical;
    //  overflow: hidden;
    //}

    & > .date {
      color: var(--primaryColor);
      font-size: 13px;
      letter-spacing: 2px;
      align-self: flex-end;
    }
  }

  & > img {
    flex-basis: ${(props) => (props.mobile ? '200px' : '400px')};
    height: ${(props) => (props.mobile ? '150px' : '250px')};
    max-width: ${(props) => (props.mobile ? 'unset' : '400px')};
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: ${(props) => (props.mobile ? '10px' : '20px')};
  }
`;

const ProductWrapper = styled.div`
  position: relative;
  margin: 10px;
  width: ${(props) => (props.mobile ? '140px' : '180px')};
  height: ${(props) => (props.mobile ? '180px' : '280px')};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 300ms;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.2);
  }

  & > .info {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30%;
    padding: 8px 10px;
    background-color: white;

    & > h3 {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: break-spaces;
    }

    & > p {
      font-weight: bold;
    }
  }

  & > img {
    position: absolute;
    width: 100%;
    height: 65%;
    padding: 20px;
    object-fit: contain;
    transition: 200ms;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export default ProductGrid;

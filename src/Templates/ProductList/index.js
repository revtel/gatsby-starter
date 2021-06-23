import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';
import FilterMenu from './FilterMenu';
import BreadcrumbBar from './BreadcrumbBar';
import SearchInput from './SearchInput';
import SortMenu from './SortMenu';
import ProductGrid from './ProductGrid';
import {updateQueries} from '../../Utils/updateQueries';
import qs from 'query-string';

function ProductList(props) {
  const prefixPath = '/products';
  const detailPrefixPath = '/product';
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');
  const [products, setProducts] = React.useState([]);
  const [mobileFilterVisible, setMobileFilterVisible] = React.useState(false);
  const params = qs.parse(props.location.search);
  const {cat, sort, search} = params;
  const mobile = dimension.rwd === 'mobile';

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        actions.setLoading(true);
        setProducts(await actions.clientFetchProducts({cat, sort, search}));
        setMobileFilterVisible(false);
      } catch (ex) {
        console.warn(ex);
      } finally {
        actions.setLoading(false);
      }
    }

    fetchProducts();
  }, [actions, cat, sort, search]);

  function renderCustomSection(sectionId) {
    return actions.renderCustomSection({
      route: prefixPath,
      sectionId,
      params,
    });
  }

  function updateRoute(options) {
    const nextQueryString = updateQueries({
      keys: ['cat', 'sort', 'search'],
      params,
      options,
    });

    navigate(`${prefixPath}${nextQueryString}`);
  }

  function onItemClick(item, evt) {
    navigate(`${detailPrefixPath}?id=${item.id}`);
  }

  return (
    <Wrapper>
      {renderCustomSection('A')}

      <div className="content">
        {renderCustomSection('B')}

        <div style={{display: 'flex'}}>
          {!mobile && (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {renderCustomSection('C')}
              <FilterMenu cat={cat} updateCat={(cat) => updateRoute({cat})} />
              {renderCustomSection('D')}
            </div>
          )}

          <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            {renderCustomSection('E')}

            <div style={{padding: 'var(--basePadding)'}}>
              <BreadcrumbBar
                cat={cat}
                updateCat={(cat) => updateRoute({cat})}
              />
            </div>

            {renderCustomSection('F')}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--basePadding)',
              }}>
              <div style={{flex: 1}} />
              <SortMenu
                sort={sort}
                updateSort={(sort) => updateRoute({sort})}
              />
              <SearchInput
                search={search}
                updateSearch={(search) => updateRoute({search})}
              />
            </div>

            {renderCustomSection('G')}

            <ProductGrid products={products} onItemClick={onItemClick} />

            {renderCustomSection('H')}
          </div>

          {!mobile && renderCustomSection('I')}
        </div>

        {mobile && renderCustomSection('I')}
        {renderCustomSection('J')}
      </div>

      {renderCustomSection('K')}

      {mobile && (
        <MobileFilter visible={mobileFilterVisible}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {renderCustomSection('C')}
            <FilterMenu cat={cat} updateCat={(cat) => updateRoute({cat})} />
            {renderCustomSection('D')}
          </div>
        </MobileFilter>
      )}

      {mobile && (
        <MobileMenuBtn
          onClick={() => setMobileFilterVisible(!mobileFilterVisible)}>
          <Button type="primary">篩選</Button>
        </MobileMenuBtn>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWith);
    margin: 0 auto;
  }
`;

const MobileMenuBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const MobileFilter = styled.div`
  z-index: 100;
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: 100vh;
  transform: ${(props) =>
    props.visible ? 'translateX(0px)' : 'translateX(-300px)'};
  transition: 180ms;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export default ProductList;

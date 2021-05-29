import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import FilterMenu from './FilterMenu';
import BreadcrumbBar from './BreadcrumbBar';
import SearchInput from './SearchInput';
import SortMenu from './SortMenu';
import ProductGrid from './ProductGrid';
import {updateQuries} from '../../Utils/updateQuries';
import qs from 'query-string';

function ProductList(props) {
  const prefixPath = '/products';
  const [products, setProducts] = React.useState([]);
  const [actions] = useOutlet('actions');
  const params = qs.parse(props.location.search);
  const {cat, sort, search} = params;

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        actions.setLoading(true);
        setProducts(await actions.fetchProducts({cat, sort, search}));
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
    const nextQueryString = updateQuries({
      keys: ['cat', 'sort', 'search'],
      params,
      options,
    });

    navigate(`${prefixPath}${nextQueryString}`);
  }

  return (
    <Wrapper>
      {renderCustomSection('A')}

      <div className="content">
        {renderCustomSection('B')}

        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {renderCustomSection('C')}

            <FilterMenu cat={cat} updateCat={(cat) => updateRoute({cat})} />

            {renderCustomSection('D')}
          </div>

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
              <SearchInput
                search={search}
                updateSearch={(search) => updateRoute({search})}
              />
              <SortMenu
                sort={sort}
                updateSort={(sort) => updateRoute({sort})}
              />
            </div>

            {renderCustomSection('G')}

            <ProductGrid products={products} />

            {renderCustomSection('H')}
          </div>

          {renderCustomSection('I')}
        </div>

        {renderCustomSection('J')}
      </div>

      {renderCustomSection('K')}
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

export default ProductList;

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
import * as AppActions from '../../AppActions';

function ProductList(props) {
  const {
    pageContext: {
      outlets = {
        categories: 'categories',
        categoryDisplayMap: 'categoryDisplayMap',
        sortOptions: 'sortOptions',
      },
      prefixPath = '/products',
      detailPrefixPath = '/product',
      collection = 'product',
      layout = {left: true, right: true},
      features = {
        cat: true,
        search: true,
        sort: true,
        breadcrumb: true,
      },
    },
  } = props;
  const [dimension] = useOutlet('dimension');
  const [products, setProducts] = React.useState([]);
  const [mobileFilterVisible, setMobileFilterVisible] = React.useState(false);
  const params = qs.parse(props.location.search);
  const {cat, sort, search} = params;
  const mobile = dimension.rwd === 'mobile';

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        AppActions.setLoading(true);
        const resp = await AppActions.clientJStorageFetch(collection, {
          cat,
          sort,
          search,
        });
        if (resp.error) {
          throw new Error(resp.error);
        }
        setProducts(resp);
        setMobileFilterVisible(false);
      } catch (ex) {
        console.warn(ex);
      } finally {
        AppActions.setLoading(false);
      }
    }

    fetchProducts();
  }, [cat, sort, search, collection]);

  function renderCustomSection(sectionId) {
    return AppActions.renderCustomSection({
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
          {!mobile && layout.left && (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {renderCustomSection('C')}

              {features.cat && (
                <FilterMenu
                  cat={cat}
                  updateCat={(cat) => updateRoute({cat})}
                  categories={outlets.categories}
                />
              )}

              {renderCustomSection('D')}
            </div>
          )}

          <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            {renderCustomSection('E')}

            {features.breadcrumb && (
              <div style={{padding: 'var(--basePadding)'}}>
                <BreadcrumbBar
                  cat={cat}
                  updateCat={(cat) => updateRoute({cat})}
                  categoryDisplayMap={outlets.categoryDisplayMap}
                />
              </div>
            )}

            {renderCustomSection('F')}

            {(features.sort || features.search) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'var(--basePadding)',
                }}>
                <div style={{flex: 1}} />
                {features.sort && (
                  <SortMenu
                    sort={sort}
                    updateSort={(sort) => updateRoute({sort})}
                    sortOptions={outlets.sortOptions}
                  />
                )}
                {features.search && (
                  <SearchInput
                    search={search}
                    updateSearch={(search) => updateRoute({search})}
                  />
                )}
              </div>
            )}

            {renderCustomSection('G')}

            <ProductGrid products={products} onItemClick={onItemClick} />

            {renderCustomSection('H')}
          </div>

          {!mobile && layout.right && renderCustomSection('I')}
        </div>

        {mobile && renderCustomSection('I')}
        {renderCustomSection('J')}
      </div>

      {renderCustomSection('K')}

      {mobile && features.cat && (
        <MobileFilter visible={mobileFilterVisible}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {renderCustomSection('C')}
            <FilterMenu
              cat={cat}
              updateCat={(cat) => updateRoute({cat})}
              categories={outlets.categories}
            />
            {renderCustomSection('D')}
          </div>
        </MobileFilter>
      )}

      {mobile && features.cat && (
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

import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {Button, Tooltip, message, Tabs} from 'antd';
import {useOutlet, useOutletSetter} from 'reconnect.js';
import qs from 'query-string';
import BreadcrumbBar from 'rev.sdk.js/Templates/ProductList/BreadcrumbBar';
import ProductVariants from 'rev.sdk.js/Components/ProductVariants';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import * as JStorage from 'rev.sdk.js/Actions/JStorage';
import {Link as LinkIcon} from '@styled-icons/boxicons-regular/Link';
import {mapLineBreak} from '../../Utils/TextUtil';
import * as AppActions from '../../AppActions';
import Carousel from '../../Components/Carousel';
import FixedRatioImage from '../../Components/FixedRatioImage';
import {THEME_COLOR} from '../../constants';

function ProductDetail(props) {
  const {
    pageContext: {
      collection = 'product',
      prefixPath = '/product',
      listViewPath = '/products',
      outlets = {categoryDisplayMap: 'categoryDisplayMap'},
    },
    renderCustomSection = (sectionId, product) => null,
  } = props;
  const [activeSummaryTab, setActiveSummaryTab] = React.useState('intro');
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [currItemConfig, setCurrItemConfig] = React.useState(null);
  const [currPrice, setCurrPrice] = React.useState(null);
  const [article, setArticle] = React.useState(null);
  const [imgIdx, setImgIdx] = React.useState(0);
  const [user] = useOutlet('user');
  const showLoginModal = useOutletSetter('login-modal');
  const [dimension] = useOutlet('dimension');
  const params = qs.parse(props.location.search);
  const {id} = params;

  React.useEffect(() => {
    async function fetchData() {
      try {
        AppActions.setLoading(true);
        const resp = await JStorage.fetchOneDocument(collection, {id});
        setProduct(resp);
        setQuantity(1);
        setImgIdx(0);
        AppActions.setLoading(false);

        // don't show global spinner for article fetching
        if (resp.article) {
          setArticle(
            await JStorage.fetchOneDocument('Article_Default', resp.article),
          );
        }
      } catch (ex) {
        console.warn(ex);
      } finally {
        AppActions.setLoading(false);
      }
    }

    fetchData();
  }, [id, collection]);

  const onNextConfig = React.useCallback((nextItemConfig, calcResp) => {
    setCurrPrice(calcResp.amount);
    setCurrItemConfig(nextItemConfig);
  }, []);

  async function copyProductShareUrl() {
    let _url = AppActions.getReurl({
      title: encodeURIComponent(product.name),
      image: product.og_image || '',
      redirectUrl: `${window.location.origin}/product?id=${product.id}`,
    });
    try {
      await navigator.clipboard.writeText(_url);
      message.success(`已複製分享連結`);
    } catch (err) {
      console.log(err);
      message.warn(`無法複製連結`);
    }
  }

  async function addToCart() {
    if (!user) {
      showLoginModal(true);
      return;
    }

    try {
      AppActions.setLoading(true);
      await Cart.addToCart(product.id, currItemConfig);
      message.success('成功');
    } catch (ex) {
      console.warn(ex);
      message.error('發生錯誤, 請稍後再重新嘗試');
    } finally {
      AppActions.setLoading(false);
    }
  }

  if (!product) {
    return null;
  }

  let gallerySize = 450;
  if (dimension.innerWidth) {
    if (dimension.innerWidth < 450 + 20 * 2) {
      gallerySize = dimension.innerWidth - 20 * 2;
    }
  }

  return (
    <Wrapper>
      {renderCustomSection('A', {product})}

      <div className="content">
        {renderCustomSection('B', {product})}
        {product.labels && product.labels[0] && (
          <div style={{marginTop: 15}}>
            <BreadcrumbBar
              cat={product.labels[0]}
              updateCat={(nextCat) => {
                navigate(`${listViewPath}?cat=${nextCat}`);
              }}
              categoryDisplayMap={outlets.categoryDisplayMap}
            />
          </div>
        )}

        <TopSection>
          <Gallery dimension={dimension} size={gallerySize}>
            {product.images && product.images[imgIdx] && (
              <Carousel
                currIdxFromParent={imgIdx}
                width={gallerySize}
                height={gallerySize}
                data={product.images.map((i) => i.expected_url)}
                renderPrev={null}
                renderNext={null}
                renderDots={null}
                renderItem={({item}) => {
                  return (
                    <FixedRatioImage
                      image={item}
                      width="100%"
                      ratio={1}
                      mode="cover"
                      alt="product"
                    />
                  );
                }}
                disableSwipe
              />
            )}

            {product.images && (
              <MiniImageList>
                {product.images.map((image, idx) => (
                  <MiniImageItem
                    src={image.expected_url}
                    alt="mini"
                    key={idx}
                    selected={idx === imgIdx}
                    onClick={() => setImgIdx(idx)}
                  />
                ))}
              </MiniImageList>
            )}
          </Gallery>

          <div style={{flexBasis: 20}} />

          <Summary>
            {renderCustomSection('C', {product})}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {renderCustomSection('D', {product})}
            <Tabs activeKey={activeSummaryTab} onChange={setActiveSummaryTab}>
              <Tabs.TabPane tab="介紹" key="intro">
                <div
                  dangerouslySetInnerHTML={{
                    __html: mapLineBreak(product.intro),
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="規格" key="spec">
                <div
                  dangerouslySetInnerHTML={{
                    __html: mapLineBreak(product.spec),
                  }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="備註" key="remark">
                <div
                  dangerouslySetInnerHTML={{
                    __html: mapLineBreak(product.remark),
                  }}
                />
              </Tabs.TabPane>
            </Tabs>

            <LineSeperator />

            <ProductVariants product={product} onNextConfig={onNextConfig} />

            <LineSeperator />

            <InputField style={{justifyContent: 'flex-end'}}>
              <h2>${currPrice || product.price}</h2>
            </InputField>

            <InputField style={{justifyContent: 'flex-end'}}>
              <Tooltip title="複製分享連結">
                <Button
                  ghost
                  icon={<LinkIcon size={24} color={THEME_COLOR} />}
                  style={{marginRight: 10}}
                  onClick={copyProductShareUrl}
                />
              </Tooltip>
              <Button size="large" type="primary" onClick={addToCart}>
                加入購物車
              </Button>
            </InputField>
          </Summary>
        </TopSection>

        {renderCustomSection('E', {product})}

        {article && (
          <ArticlePreview dangerouslySetInnerHTML={{__html: article.html}} />
        )}

        {renderCustomSection('F', {product})}
      </div>

      {renderCustomSection('G', {product})}
    </Wrapper>
  );
}

const ArticlePreview = styled.div`
  & img {
    max-width: 100%;
  }
`;

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWidth);
    margin: 0 auto;
    padding: var(--basePadding);
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0;
`;

const Gallery = styled.div`
  width: ${(props) => props.size}px;
  margin-bottom: 20px;

  & > img:first-child {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    object-fit: contain;
  }
`;

const Summary = styled.div`
  & h2 {
    font-size: 32px;
    line-height: 1.57;
  }

  & h3 {
    font-size: 21px;
  }

  & > p {
    margin: 20px 0;
    font-size: 17px;
  }

  flex: 1;
  flex-basis: 450px;
  margin: 20px;
`;

const LineSeperator = styled.section`
  border-top: 1px solid #eee;
  margin: 20px 0;
`;

const InputField = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  & > label {
    margin-right: 10px;
  }
`;

const ProductArticle = styled.div`
  min-height: 700px;
`;

const MiniImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MiniImageItem = styled.img`
  width: 64px;
  height: 64px;
  margin: 10px;
  border: 2px solid ${(props) => (props.selected ? '#ccc' : 'transparent')};
  border-radius: 4px;
  object-fit: contain;
  cursor: pointer;

  :first-child {
    margin-left: 0px;
  }
`;

export default ProductDetail;

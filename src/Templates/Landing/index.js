import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Skeleton, Space} from 'antd';
import {StaticImage} from 'gatsby-plugin-image';
import ReactDelighters from 'rev.sdk.js/Components/ReactDelighters';
import {JStorage} from 'rev.sdk.js';
import ReactPlayer from 'react-player';
import Slick from 'react-slick';
import {useOutlet} from 'reconnect.js';
import moment from 'moment';

function Landing(props) {
  const [site, setSite] = useState(null);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [actions] = useOutlet('actions');

  useEffect(() => {
    const _fetchSite = async () => {
      try {
        actions.setLoading(true);
        const _site = (await JStorage.fetchDocuments('site', {})).results[0];
        const _product = (await JStorage.fetchDocuments('product', {})).results;
        const _articles = (await JStorage.fetchDocuments('Article_Default', {}))
          .results;
        setSite(_site);
        setProducts(_product);
        setArticles(_articles);
      } catch (e) {
      } finally {
        actions.setLoading(false);
      }
    };
    _fetchSite().then(() => {});
  }, [actions]);

  const common = (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <HeroBannerLogo />
      <img
        src="/pokemon-logo.png"
        alt="logo"
        style={{height: 100, transform: 'scale(2.5)'}}
      />
    </div>
  );

  return (
    <ReactDelighters>
      <Wrapper>
        <Slick
          dots={false}
          infinite={true}
          speed={300}
          slidesToShow={1}
          slidesToScroll={1}
          showArrow={false}
          autoPlay={true}
          beforeChange={() => {
            setDragging(true);
          }}
          afterChange={() => {
            setDragging(false);
          }}>
          {site ? (
            site.hero_banner.images.map((i) => {
              if (i.file_type.indexOf('video') > -1) {
                return (
                  <HeroBannerSection>
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      playing
                      loop
                      muted
                      url={i.expected_url}
                    />
                    {common}
                  </HeroBannerSection>
                );
              } else {
                return (
                  <HeroBannerSection>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      src={i.expected_url}
                      alt="hero banner"
                    />
                    {common}
                  </HeroBannerSection>
                );
              }
            })
          ) : (
            <HeroBannerSection />
          )}
        </Slick>

        <div style={{height: 1}} />

        <ArticleSection>
          <div className="content">
            <div className="header">
              <div className="title">最新消息</div>
              <div className="subtitle">News</div>
            </div>
            {articles.slice(0, 2).map((a, idx) => (
              <ArticleItem
                data={a}
                key={idx}
                onClick={() => {
                  actions.navigate(`/article?id=${a.id}`, {loading: true});
                }}
              />
            ))}
          </div>
          <img
            src="/article_section_corner.png"
            className="left_bottom"
            alt="corner-image"
          />
          <img
            className="right_top"
            src="/article_section_corner_right_top.png"
            alt="corner-image"
          />
        </ArticleSection>

        <div style={{height: 1}} />

        <RecommendProductSection>
          <div className="content">
            <div className="header">
              <div className="title">推薦產品</div>
              <div className="subtitle">Recommended Products</div>
            </div>
            {products.slice(0, 6).map((p, idx) => (
              <RecommendProductItem
                key={idx}
                onClick={() => {
                  actions.navigate(`/product/?id=${p.id}`, {loading: true});
                }}>
                <img
                  src={p.images[0].expected_url}
                  alt="Logo"
                  style={{width: 180, height: 180, objectFit: 'contain'}}
                />

                <div className="description">
                  <h3>{p.name}</h3>
                  <p>{p.price}</p>
                </div>
              </RecommendProductItem>
            ))}
          </div>
        </RecommendProductSection>

        {/*<FlexItemSection*/}
        {/*  style={{padding: '100px 40px', backgroundColor: '#eee'}}>*/}
        {/*  <h3 style={{textAlign: 'center'}}>RevtelTech @ 2021</h3>*/}

        {/*  <div className="content">*/}
        {/*    <FlexItem>*/}
        {/*      <div className="description">*/}
        {/*        <h3>Contact</h3>*/}
        {/*        <p>Email: xxx@gmail.com</p>*/}
        {/*        <p>Mobile: 0911222333</p>*/}
        {/*      </div>*/}
        {/*    </FlexItem>*/}

        {/*    <FlexItem>*/}
        {/*      <div className="description">*/}
        {/*        <h3>Downloads</h3>*/}
        {/*        <Button>iOS App</Button>*/}
        {/*        <Button>Android App</Button>*/}
        {/*      </div>*/}
        {/*    </FlexItem>*/}
        {/*  </div>*/}
        {/*</FlexItemSection>*/}
      </Wrapper>
    </ReactDelighters>
  );
}

function HeroBannerLogo(props) {
  return (
    <StaticImage
      src="../../../static/favicon.png"
      alt="Logo"
      placeholder="blurred"
      layout="fixed"
      width={256}
      height={256}
    />
  );
}

const Wrapper = styled.div`
  & > section {
    position: relative;
    overflow-x: hidden;
  }

  & .landing-slide-in-right {
    opacity: 0;
    transform: translateX(2000px);
    transition: 350ms;
  }

  & .landing-slide-in-right.delighter.started {
    opacity: 1;
    transform: translateX(0px);
  }

  & .landing-slide-in-left {
    opacity: 0;
    transform: translateX(-2000px);
    transition: 350ms;
  }

  & .landing-slide-in-left.delighter.started {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const HeroBannerSection = styled.section`
  transform: translateY(var(--topNavBarHeight));
  height: calc(100vh);
  position: relative;
  cursor: pointer;
  aspect-ratio: calc(16 / 9);
  background-color: #000;

  & > img {
    object-fit: cover;
  }

  & > h2 {
    font-size: 32px;
    color: white;
  }

  & > p {
    font-size: 18px;
    color: #ccc;
  }
`;

const RowBannerSection = styled.section`
  padding: 40px 20px;

  & > .content {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > .description {
      display: flex;
      flex-direction: column;

      & > h2 {
        font-size: 32px;
        color: #888;
      }

      & > p {
        font-size: 18px;
        color: #ccc;
      }
    }
  }
`;

const FlexItemSection = styled.section`
  padding: 40px;

  & > .content {
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    line-height: 1.57;

    & > .header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > .title {
        font-size: 24px;
      }

      & > .subtitle {
        font-size: 16px;
      }
    }
  }
`;

const FlexItem = styled.div`
  margin: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > .description {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h3 {
      font-size: 24px;
      color: #888;
    }

    & > p {
      font-size: 18px;
      color: #ccc;
    }
  }
`;

const ArticleSection = styled(FlexItemSection)`
  position: relative;

  & > .content {
    & > .header {
      margin-bottom: 30px;

      & > .title {
      }

      & > .subtitle {
      }
    }
  }

  & > img.right_top {
    position: absolute;
    right: -180px;
    top: -80px;
    z-index: -1;
  }

  & > img.left_bottom {
    position: absolute;
    bottom: 0;
    left: -150px;
    z-index: -1;
  }
`;

const RecommendProductSection = styled(FlexItemSection)`
  background-image: url('/recommend_products.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  & > .content {
    & > .header {
      & > .title {
        color: white;
      }

      & > .subtitle {
        color: white;
      }
    }
  }
`;

const RecommendProductItem = styled(FlexItem)`
  background: #fff;
  border-radius: 10px;
  border: 5px solid #ccc;
  padding: 15px;
  cursor: pointer;
  transition: all 400ms ease;

  :hover {
    transform: translateY(-5px) translateX(-5px);
    border: 5px solid black;
    box-shadow: 5px 5px 0 #ccc;
  }

  & > .description {
    line-height: 1.57;
  }
`;

function ArticleItem(props) {
  let {data, onClick} = props;
  return (
    <BlogWrapper img={data.image} onClick={onClick}>
      <div className="bg-img" />
      <div className="content">
        <div className="title">
          <div>{data.title}</div>
          <div>{moment(data.created).format('YYYY-MM-DD hh:mm')}</div>
        </div>
        <div className="content">{data.outline}</div>
      </div>
    </BlogWrapper>
  );
}

const BlogWrapper = styled.div`
  margin-bottom: 56px;
  border-radius: 20px;
  max-width: 1300px;
  width: 100%;
  min-height: 285px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  overflow: hidden;
  display: flex;
  cursor: pointer;
  transition: transform 400ms ease;

  &:hover {
    transform: scale(1.025);
  }

  & > .bg-img {
    max-width: 285px;
    width: 100%;
    background-color: #acacac;
    background-image: url(${(props) => props.img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & > .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 60px;

    & > .title {
      display: flex;
      flex-display: column;
      border-bottom: 1px solid var(--primaryColor);
      padding-bottom: 16px;
      width: 100%;
      color: var(--primaryColor);
      line-height: 1.57;

      & > h3 {
        font-size: ${(props) => (props.mobile ? '20px' : '25px')};
        color: var(--primaryColor);
      }
    }

    & > .content {
      margin: 25px 0px 10px 0px;
      max-width: 1015px;
      width: 100%;
      height: 92px;
      line-height: 1.9;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      font-size: 16px;
      color: #cecece;
    }

    & > button {
      align-self: flex-end;
      border: 0px;
      background-color: #ffffff;
      font-size: 14px;
      color: var(--primaryColor);
      cursor: pointer;

      :hover {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    & > .bg-img {
      max-width: none;
      height: 200px;
    }

    & > .content {
      padding: 20px;

      & > .title {
        & > h3 {
          font-size: 18px;
        }
      }

      & > .content {
        height: 86px;
        font-size: 12px;
      }
    }
  }
`;

export default Landing;

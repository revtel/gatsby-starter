import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';

let LINK_ITEMS = [
  {
    title: '關於我們',
    to: '/about',
    items: [
      {
        title: '品牌介紹',
        to: '/about#intro',
      },
      {
        title: '客製化諮詢',
        to: '/about#consult',
      },
      {
        title: '聯絡我們',
        to: '/about#contact',
      },
    ],
  },
  {
    title: '商品項目',
    to: '/products',
    items: [
      {
        title: '主題商品',
        to: '/products?cat=theme',
      },
      {
        title: '客製商品',
        to: '/products?cat=custom',
      },
    ],
  },
  // {
  //   title: '問答FAQ',
  //   to: '',
  //   items: [
  //     {
  //       title: '購物指南',
  //       to: '',
  //     },
  //     {
  //       title: '客製化須知',
  //       to: '',
  //     },
  //     {
  //       title: '常見問題',
  //       to: '',
  //     },
  //     {
  //       title: '條款聲明',
  //       to: '',
  //     },
  //   ],
  // },
  {
    title: '文章',
    to: '',
    items: [
      {
        title: '部落格',
        to: '/articles',
      },
      {
        title: '最新消息',
        to: '/articles?cat=news',
      },
    ],
  },
];

function SiteFooter(props) {
  const [dimension] = useOutlet('dimension');

  return (
    <FlexItemSection isMobile={!(dimension.rwd === 'desktop')}>
      <div
        className="content-section"
        style={{
          padding: 30,
          flexDirection: dimension.rwd === 'desktop' ? 'row' : 'column',
        }}>
        <div className="constrain">
          <h2
            onClick={() => navigate('/')}
            style={{flex: 1, textAlign: 'center'}}>
            <img
              src="/images/revicon_512.png"
              alt="Logo"
              style={{
                height: 150,
                objectFit: 'contain',
              }}
            />
          </h2>
          <div style={{flex: 1}} />

          <div
            className="info"
            style={{
              display: 'flex',
              flex: 1,
              marginTop: dimension.rwd === 'desktop' ? 0 : 40,
              justifyContent: 'space-between',
            }}>
            {LINK_ITEMS.map((item, idx) => (
              <div style={{minWidth: dimension.rwd === 'desktop' ? 120 : 85}}>
                <div
                  className="link-title"
                  style={{color: '#0eb407'}}
                  onClick={() => navigate('/')}>
                  {item.title}
                </div>
                {item.items.map((i) => (
                  <div className="link-item" onClick={() => navigate(i.to)}>
                    {i.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            className="info"
            style={{
              flex: 1,
              alignSelf: 'stretch',
              marginTop: dimension.rwd === 'desktop' ? 0 : 40,
            }}>
            <p className="info-text"> 聯絡我們</p>
            <p className="info-text"> revteltech@gmail.com.tw</p>
            <p className="info-text"> 02-2736-6566</p>
            <p className="info-text"> 臺北市大安區和平東路二段76巷29弄4號1樓</p>
            <p className="info-text">
              {' '}
              週一至週五上午10點至下午7點（例假日休息）
            </p>

            <div
              className="info"
              style={{
                maxWidth: 280,
                justifyContent:
                  dimension.rwd === 'desktop' ? 'flex-end' : 'center',
                // textAlign: 'right',
                marginTop: 40,
              }}>
              <a
                href="https://www.youtube.com/channel/UCXfn2Ob1iDzajn-ZzT0sEmw"
                target="_blank"
                rel="noreferrer">
                <img
                  src="/images/fb.png"
                  alt="Logo"
                  style={{height: 40, objectFit: 'contain'}}
                />
              </a>
              <a
                href="https://www.instagram.com/vbeauty.group/"
                target="_blank"
                rel="noreferrer">
                <img
                  src="/images/ig.png"
                  alt="Logo"
                  style={{height: 40, objectFit: 'contain', marginLeft: 15}}
                />
              </a>
              <a
                href="https://www.instagram.com/vbeauty.group/"
                target="_blank"
                rel="noreferrer">
                <img
                  src="/images/line.png"
                  alt="Logo"
                  style={{height: 40, objectFit: 'contain', marginLeft: 15}}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div
          className="constrain"
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div>2021 Revteltech</div>
          <div style={{verticalAlign: 'middle', marginTop: 8}}>
            <div
              style={{
                display: 'inline',
                color: 'grey',
                marginRight: 5,
                fontSize: 10,
              }}>
              Powered By
            </div>
            <a
              style={{
                display: 'inline',
                fontSize: 12,
                color: '#14A58C',
              }}
              href="https://revteltech.pse.is/3psgrd"
              target="_blank"
              rel="noreferrer">
              奕果雲端數位 EcultureTech
            </a>
          </div>
        </div>
      </div>
    </FlexItemSection>
  );
}

const FlexItemSection = styled.section`
  text-align: ${(props) => (props.isMobile ? 'center' : 'left')};
  & > .content {
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }

  & .constrain {
    margin: 0 auto;
    max-width: var(--contentMaxWidth);
    display: flex;
    flex: 1;
    ${(props) => console.log('props', props)}
    flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
    /* align-items: center; */
  }

  & > .bottom-section {
    background-color: #f6f6f6;
    padding: 25px 40px;
    font-size: 13px;
  }

  & > .content-section {
    display: flex;

    & .info {
      flex-basis: 100px;
      & .info-text {
        color: #707070;
        margin-top: 8px;
        :first-child {
          margin-top: 0px;
        }
      }
      & img {
        cursor: pointer;
      }
    }

    & .link-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    & .link-item {
      padding: 5px 0px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease-out;
      white-space: break-spaces;
      text-align: ${(props) => (props.isMobile ? 'center' : 'left')};
      color: #707070;

      :hover {
        color: #000;
      }
    }

    & .social-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border: 1px solid #eee;
      border-radius: 20px;
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
    display: flex;
    flex-direction: column;
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

export default SiteFooter;

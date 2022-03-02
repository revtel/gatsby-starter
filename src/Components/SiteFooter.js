import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import * as AppActions from '../AppActions';
import {COMMENT_KEYS} from '@babel/types';

let LINK_ITEMS = [
  {
    title: '關於我們',
    to: '/about',
    loading: 300,
    items: [
      {
        title: '品牌介紹',
        to: '/about#intro',
        loading: 300,
      },
      {
        title: '客製化諮詢',
        to: '/about#consult',
        loading: 300,
      },
      {
        title: '聯絡我們',
        to: '/about#contact',
        loading: 300,
      },
    ],
  },
  {
    title: '商品項目',
    to: '/products',
    loading: true,
    items: [
      {
        title: '主題商品',
        to: '/products?cat=theme',
        loading: true,
      },
      {
        title: '客製商品',
        to: '/products?cat=custom',
        loading: true,
      },
    ],
  },
  {
    title: '文章',
    to: '/articles',
    loading: true,
    items: [
      {
        title: '部落格',
        to: '/articles',
        loading: true,
      },
      {
        title: '最新消息',
        to: '/articles?cat=news',
        loading: true,
      },
    ],
  },
];

const CONTACT_INFO = {
  email: 'revteltech@gmail.com.tw',
  phone: '+886227366566',
  addressGoogleMap: 'https://g.page/RevtelTech?share',

  phoneDisplay: '02-2736-6566',
  addressDisplay: '103台北市大同區民權西路136號10樓之5',
  workTimeDisplay: '週一至週五上午10點至下午7點（例假日休息）',
};

function SiteFooter(props) {
  const [dimension] = useOutlet('dimension');

  return (
    <FlexItemSection isMobile={!(dimension.rwd === 'desktop')}>
      <div className="bottom-section">
        <div
          className="constrain"
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div style={{verticalAlign: 'middle', marginTop: 8}}>
            <div
              style={{
                display: 'inline',
                color: 'grey',
                marginRight: 5,
                fontSize: 18,
              }}>
              Powered By
            </div>
            <a
              style={{
                display: 'inline',
                fontSize: 24,
              }}
              href="https://www.revtel.tech"
              target="_blank"
              rel="noreferrer">
              忻旅科技股份有限公司
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

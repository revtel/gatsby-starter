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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f6f6f6',
          fontSize: 24,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <h1 style={{marginBottom: 20}}>與我們聯繫</h1>

        {[
          [
            '/images/internet.png',
            '忻旅科技股份有限公司',
            'https://www.revtel.tech',
            '#008E89',
          ],
          [
            '/images/phone.png',
            '(02)2557-8895',
            'tel:+886225578895',
            '#085E7D',
          ],
          [
            '/images/mail.png',
            'contact@revteltech.com',
            'mailto:contact@revteltech.com',
            '#085E7D',
          ],
          [
            '/images/facebook.png',
            'RevtelTech 忻旅科技',
            'https://www.facebook.com/RevtelTech',
            '#085E7D',
          ],

          /*
          [
            '/images/facebook.png',
            '軟體開發疑難雜症交流區',
            'https://www.facebook.com/groups/software.blablablabla',
            '#084594',
          ],
          */
        ].map((item, idx) => (
          <div
            style={{
              width: 320,
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: 24,
            }}
            key={idx}>
            <img src={item[0]} width="20" height="20" />
            <a
              href={item[2]}
              target="_blank"
              ariaLabel={item[1]}
              alt={item[1]}
              style={{marginLeft: 20, color: item[3] || '#085E7D'}}
              rel="noreferrer">
              {item[1]}
            </a>
          </div>
        ))}
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

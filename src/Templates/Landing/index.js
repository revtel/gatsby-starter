import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {StaticImage} from 'gatsby-plugin-image';
import ReactDelighters from 'rev.sdk.js/Components/ReactDelighters';
import {Element} from 'react-scroll';
import {useOutlet, useOutletSetter} from 'reconnect.js';

function Landing(props) {
  const [dimension] = useOutlet('dimension');
  const mobile = dimension.rwd !== 'desktop';
  return (
    <ReactDelighters>
      <Wrapper>
        <HeroBannerSection
          style={{
            backgroundImage: 'url("/images/building-839362_1280.jpg")',
            width: '100%',

            padding: 20,

            //height: 300,
          }}>
          <h2
            style={{
              color: '#1D267D',
              fontSize: '2.5rem',
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: 5,
              padding: '5px 10px',
            }}>
            RevB2B : B2B 採購下單系統
          </h2>
          <h1
            style={{
              //color: '#ACB1D6',
              marginTop: 20,
              fontWeight: 400,
              color: '#C63D2F',
            }}>
            RevtelTech 數位轉型專家
          </h1>
        </HeroBannerSection>

        <FlexItemSection
          style={{
            backgroundColor: '#eee',
            width: '100%',
            maxWidth: 1500,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <p
            style={{
              borderRadius: 10,
              backgroundColor: '#DBDFEA',
              width: '80%',
              maxWidth: 800,
              minWidth: 350,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
              color: '#393E46',
              fontSize: 16,
            }}>
            「RevB2B
            採購下單系統」是一個專為企業設計的流程工具，能有效簡化和優化企業間的採購流程。
            <br />
            <br />
            系統全線上化，透過雲端技術讓客戶能輕易選取供應商提供的商品，並能針對不同等級的客戶提供不同報價。客戶更可輕易建立不同需求之選購單，降低採購流程的人為錯誤及溝通失誤。
          </p>
        </FlexItemSection>

        {/*
        <FlexItemSection
          style={{
            backgroundColor: '#eee',
            width: '100%',
            maxWidth: 1500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <h3 style={{alignSelf: 'center', fontSize: 24}}>進行步驟</h3>
          <div className="content">
            {[
              ['STEP 1', '顧問評估', '釐清業務範圍及真實需求'],
              ['STEP 2', '系統開發', '根據需求打造專屬後台系統'],
              ['STEP 3', '系統整合', '進行必要的外部系統介接'],
              ['STEP 4', '雲端部署', '全雲端管理、維護及協作'],
            ].map((item) => {
              return (
                <FlexItem
                  key={item[0]}
                  style={{
                    width: mobile ? '90%' : '20%',
                    borderRadius: 10,
                    padding: 5,
                    backgroundColor: 'white',
                    boxShadow:
                      'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                    minHeight: mobile ? 100 : 200,
                  }}>
                  <div className="description" style={{borderRadius: 10}}>
                    <h4 style={{margin: 0, marginBottom: 10}}>{item[0]}</h4>
                    <h3 style={{margin: 0, marginBottom: 10}}>{item[1]}</h3>
                    <p style={{color: '#3E3E3E'}}>{item[2]}</p>
                  </div>
                </FlexItem>
              );
            })}
          </div>
        </FlexItemSection>
          */}
        {
          <FlexItemSection
            style={{
              backgroundColor: '#eee',
              width: '100%',
              maxWidth: 1500,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <h3 style={{alignSelf: 'center', fontSize: 24}}>優勢&特色</h3>
            <div className="content">
              {[
                ['使用便利', '雲端搭建，企業及客戶不需要額外系統整合'],
                ['線上型錄', '除下單外亦可作為型錄系統供客戶選購瀏覽'],
                ['專屬建置', '可部署於企業的網域，確保專業及資料安全'],
                ['彈性客製', '基於模組的額外整合，可彈性和既有系統串連'],
              ].map((item) => (
                <FlexItem
                  key={item[0]}
                  style={{
                    borderRadius: 10,
                    padding: 15,
                    backgroundColor: '#EEEDDE',
                    boxShadow:
                      'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                    minHeight: mobile ? 100 : 200,
                  }}>
                  <div
                    className="description"
                    style={{borderRadius: 10, textAlign: 'center'}}>
                    <h4 style={{marginBottom: 20, fontSize: 20}}>{item[0]}</h4>
                    <p style={{color: '#3E3E3E'}}>{item[1]}</p>
                  </div>
                </FlexItem>
              ))}
            </div>
          </FlexItemSection>
        }

        <CaseSection />

        <FlexItemSection
          style={{
            backgroundColor: '#eee',
            width: '100%',
            maxWidth: 1500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <h3 style={{alignSelf: 'center', fontSize: 24}}>合作夥伴</h3>
          <div className="content">
            {[
              [
                'New Balance',
                'https://www.revtel.tech/static/63b4573bd289ac0f9880851f15e3dd07/1d98e/nb.png',
              ],
              [
                '直接跟農夫買',
                'https://consult.revtel.tech/images/buydirectlyfromfarmers.png',
              ],
            ].map((item) => (
              <FlexItem
                key={item[0]}
                style={{
                  borderRadius: 10,
                  padding: 15,
                  backgroundColor: 'white',
                  boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                  minHeight: mobile ? 100 : 200,
                }}>
                <div
                  className="description"
                  style={{
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <h4 style={{marginBottom: 20, fontSize: 20}}>{item[0]}</h4>
                  <img
                    style={{color: '#3E3E3E', width: 100, height: 100}}
                    src={item[1]}
                    alt={item[0] + ' B2B 下單系統'}
                  />
                </div>
              </FlexItem>
            ))}
          </div>
        </FlexItemSection>

        {/*
        <FlexItemSection
          style={{
            backgroundColor: '#eee',
            width: '100%',
            maxWidth: 1500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <a
            href={'/'}
            style={{
              padding: '5px 10px',
              color: '#522546',
              fontSize: '1.8rem',
              marginTop: 15,
              marginBottom: 15,
              fontWeight: 'bold',
              borderRadius: 10,
              backgroundColor: '#DAD0C2',
            }}
            rel="noreferrer">
            更多案例及資訊 ➚
          </a>
        </FlexItemSection>
         */}
      </Wrapper>
    </ReactDelighters>
  );
}

function CaseSection({}) {
  const [idx, setIdx] = React.useState(0);

  return (
    <FlexItemSection
      style={{
        backgroundColor: '#eee',
        width: '100%',
        maxWidth: 1500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <h3 style={{alignSelf: 'center', fontSize: 24}}>系統示意截圖</h3>

      <div
        className="content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          //width: '100%',
          marginTop: 20,
          maxWidth: 1200,
          padding: 20,
          backgroundColor: '#ECE2E1',
          borderRadius: 10,
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {[
            ['/images/s1.png', '可公告最新資訊予客戶'],
            ['/images/s2.png', '適當分類供客戶瀏覽'],
            ['/images/s3.png', '提供細節供客戶購買'],
            ['/images/s4.png', '客戶自定義購物車'],
            ['/images/s5.png', '購物車自由匯出紀錄'],
          ].map((item) => (
            <div
              key={item[0]}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <h4>{item[1]}</h4>
              <img
                src={item[0]}
                style={{
                  width: '80%',
                  maxWidth: 1000,
                  minWidth: 100,
                  marginBottom: 10,
                }}
                key={item[0]}
              />
            </div>
          ))}
        </div>
      </div>
    </FlexItemSection>
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

  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const NavBar = styled.div`
  position: fixed;
  background-color: ${(props) => props.bgColor};
  top: 0px;
  left: 0px;
  width: 100vw;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  z-index: 1;
  box-shadow: ${(props) =>
    props.hasBorder
      ? '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
      : 'none'};
  transition: 200ms;
`;

const HeroBannerSection = styled.section`
  //padding: 80px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > h2 {
    font-size: 32px;
    color: white;
  }
  & > p {
    font-size: 18px;
    color: lightgrey;
  }
`;

const RowBannerSection = styled.section`
  padding: 10px 10px;
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
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
`;

const FlexItem = styled.div`
  margin: 20px 20px;
  width: 20%;
  min-width: 250px;
  min-height: 200px;
  background-color: red;
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

export default Landing;

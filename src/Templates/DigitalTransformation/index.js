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
            backgroundImage: 'url("/images/particles-7411687_1280.jpg")',
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
            數位轉型需要兼顧穩定及發展
          </h2>
          <h1
            style={{
              //color: '#ACB1D6',
              marginTop: 20,
              fontWeight: 400,
              color: 'lightgrey',
            }}>
            RevtelTech 數位轉型技術陪跑
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
            Web3
            作為下一代互聯網的重要發展方向，為企業帶來了全新的機遇和挑戰。我們致力於成為企業的轉型夥伴，幫助企業從傳統的
            Web2 模式轉型到 Web3，創建不同的商業模式。
            <br />
            <br />
            對企業來說，除了思考 Web3 能帶來的優勢之外，如何從 Web2 到 Web3
            平順的過渡更是轉型的重中之重。
            <br />
            <br />
            忻旅科技結合過往在 Web2 及 Web3
            的豐富經驗，能深入了解業務需求，並根據行業特點和發展趨勢提供量身定制的解決方案。
          </p>
        </FlexItemSection>

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

        {!mobile && (
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
                ['顧問先行', '透過需求分析確保系統真正解決問題'],
                ['高度彈性', '全雲端介接，易於第三方整合及部署'],
                ['完整模組', '過往產業經驗完整，不需從零開始開發'],
                ['高穩定性', '雲原生架構支援，因應各式應用情境'],
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
        )}

        <CaseSection />
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
      </Wrapper>
    </ReactDelighters>
  );
}

const CaseData = [
  [
    ['/images/hiprint.png', '/images/h1.png'],
    '印刷業一站式電商 & ERP',
    `印刷品在我們生活中隨處可見，報章書籍到舒壓小物都在這個範疇。但作為一個高度成熟的產業，如何在既有基礎上進行升級是困難的。本產品&合作案我們結合顧問及三年的轉型規劃成功打造國內唯一之印刷業電商方案，結合一站式 ERP 讓訂單爆滿不是夢想。`,
    // {maxWidth: 600},
  ],
  [
    ['/images/b1.jpeg'],
    '智能藍牙鎖 APP & Cloud',
    `數位轉型及升級的一個安全規劃是從產品做起，畢竟開源總比節流來的易於理解。在這個藍牙智慧鎖的方案中，我們透過全方位的 UIUX 及軟體顧問設計，為業主打造一個完整且可持續的新產品，藉此來調整內部組織結構使得轉型變得可能。`,
  ],
  [
    ['/images/df1.jpeg'],
    '幫農事營運 APP',
    `環境友善及公平貿易是越來越重要的普世價值， 直接跟農夫買 便是在這條路上具代表性的先驅者。本合作案在原本電商系統上擴充並打造了一個內部派單系統，協助農友更好的掌握訂單及產品資訊，以此提升終端的服務品質。`,
  ],
];

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
      <h3 style={{alignSelf: 'center', fontSize: 24}}>案例分享</h3>

      <div
        className="content"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          marginTop: 20,
          maxWidth: 1500,
        }}>
        {CaseData.map((item, _idx) => item[1]).map((name, _idx) => (
          <div
            onClick={() => setIdx(_idx)}
            key={_idx}
            style={{
              width: `calc(100%/${CaseData.length} - 10px)`,
              cursor: 'pointer',
              maxWidth: 300,
              textAlign: 'center',
              verticalAlign: 'middle',
              borderRadius: 10,
              //padding: 5,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 100,
              backgroundColor: _idx === idx ? '#F08A5D' : '#8785A2',
              color: _idx === idx ? 'white' : '#EAEAEA',
              border: _idx === idx ? '2px solid #7D5A50' : null,
            }}>
            <h4 style={{fontSize: 20}}>{name}</h4>
          </div>
        ))}
      </div>

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
        {CaseData.filter((_, _idx) => _idx === idx).map((item) => (
          <div
            key={item[1]}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <h4 style={{marginBottom: 20, fontSize: 20}}>{item[1]}</h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                width: '80%',
              }}>
              {item[2]}
            </div>
            {(item[0] || []).map((imgData) => (
              <img
                src={imgData}
                style={{width: '100%', marginBottom: 10, ...(item[3] || {})}}
              />
            ))}
          </div>
        ))}
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

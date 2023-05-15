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
            backgroundImage: 'url("/images/network.jpg")',
            width: '100%',

            padding: 20,

            //height: 300,
          }}>
          <h1 style={{color: 'lightgrey', fontSize: '2.5rem'}}>
            透過
            <p style={{display: 'inline-block', color: '#DBDFAA'}}>
              客製化後台
            </p>
            及
            <p style={{display: 'inline-block', color: '#E7CBCB'}}>
              雲端資料庫
            </p>
            打造強大商業價值
          </h1>
          <p style={{color: '#ACB1D6', marginTop: 20}}>
            顧問諮詢 / 系統開發 / 商務協作
          </p>
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
          <h2
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
            }}>
            雲端資料庫和後台是現代企業成功的基石。以此為核心能提供高度安全且可靠的方式來存儲和管理資料，並滿足免安裝且隨時可用的情境。
            <br />
            <br />
            然而對每個企業來說，業務需求、資料結構及商務邏輯都是獨一無二的。透過客製化後台和雲端資料庫可以更好地滿足企業特定的需求並提高企業的靈活性和競爭力。
            <br />
            <br />
            通過顧問服務對業務需求的深入了解，我們可以提供量身定制的後台和雲端資料庫解決方案。相比於傳統的本地資料庫或套裝系統，這可以幫助企業更好地管理其數據和資源，進一步提高生產力和效率。
          </h2>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <div className="content">
            {[
              ['STEP 1', '顧問合作', '釐清業務範圍及真實需求'],
              ['STEP 2', '系統開發', '根據需求打造專屬後台系統'],
              ['STEP 3', '系統開發', '進行必要的外部系統介接'],
              ['STEP 4', '雲端部署', '全雲端管理、維護及協作'],
            ].map((item) => {
              return (
                <FlexItem
                  key={item[0]}
                  style={{
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
            <h2 style={{alignSelf: 'center'}}>優勢&特色</h2>
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
                    <h3 style={{marginBottom: 20}}>{item[0]}</h3>
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
    ['/images/survey-1.png', '/images/survey-2.png'],
    '問卷管理及發布系統',
    `本合作開發了一個客製化問卷管理系統，其能方便、高效地創建、發布、收集和分析問卷。

客戶使用此此管理系統，於後續營運上輕鬆地創建自定義的問卷，並根據不同需求添加各式問題類型，如單選、多選、文字填空等。
    
當問卷準備就緒後，客戶能於系統上預覽在手機及電腦上的版型並生成獨特連結及 QR Code。
    
後續收集回應後，本管理系統會自動統計和整理數據，提供結果報告和圖表。
    
此為客戶原本內部系統的延伸組件，透過 Restful API 等彈性架構平順的連結既有商務邏輯並可無痛導入。`,
  ],
  [
    ['/images/flow-1.png', '/images/flow-2.png'],
    '公家機關內部管理簽核系統',
    `本內部管理簽核系統是一個提升機關內部流程效率和文件管理的專用工具。以統一的平台讓機關簽核流程更加順暢、透明且高效。

核心功能之一是線上簽核，讓相關人員可以在一個統一的平台上處理簽核事項。無論是文件審核、預算核准、合約簽署或其他類型的審批流程，公家機關內部管理簽核系統都能提供一個方便的數位化環境，減少紙本文件的使用、印刷和遺失的風險。
    
搭配使用者權限管理功能，可以確保流程的合規性和安全性。而通知和提醒功能能讓相關人員能夠及時獲取簽核進度、提出問題或提供回饋，以確保簽核過程的透明度和溝通效率。`,
  ],
  [
    ['/images/print-1.png'],
    '印刷接單及生產系統',
    `印刷接單及生產系統是一個專為印刷行業設計的全面解決方案。該系統旨在協助印刷公司管理和追踪訂單，並有效地組織和控制生產流程，以提供高品質的印刷產品和優質的客戶服務。

這個系統的核心功能之一是接單管理。它提供了一個集中的平台，讓印刷公司能夠輕鬆地接收、處理和追踪訂單。從客戶的需求到具體印刷項目的詳細信息，系統可以有效地記錄和管理，確保訂單的準確性和完整性。同時，系統還提供了通知和提醒功能，確保印刷公司及時獲取新訂單的信息並作出相應的安排。
  
除了接單管理，本系統還提供了報表生成和分析功能。這使得印刷公司能評估業務績效、做出準確的決策並進行持續改進。`,
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
      <h2 style={{alignSelf: 'center'}}>案例分享</h2>

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
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 100,
              backgroundColor: _idx === idx ? '#F08A5D' : '#8785A2',
              color: _idx === idx ? 'white' : '#EAEAEA',
              border: _idx === idx ? '2px solid #7D5A50' : null,
            }}>
            {name}
          </div>
        ))}
      </div>

      <div
        className="content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '100%',
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
            <h2 style={{marginBottom: 20}}>{item[1]}</h2>
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
              <img src={imgData} style={{width: '100%', marginBottom: 10}} />
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

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
          id="header"
          style={{
            /*
            backgroundImage:
              'linear-gradient(to left bottom, #ffb72b, #ffc226, #ffce21, #ffda1d, #ffe61b)',
              */
            backgroundImage: 'url("/images/banner.jpg")',
            width: '100%',
            height: '60vh',
          }}>
          <h1 style={{color: '#362222', fontSize: 48}}>忻旅科技軟體顧問</h1>
          <h2 style={{color: 'grey', fontSize: 18, fontWeight: 400}}>
            顧問諮詢 / 系統開發 / 商務協作
          </h2>
        </HeroBannerSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="expertise">
            <h2>專長領域</h2>
          </Element>

          <div className="content">
            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#F9E0BB',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                width: '65%',
                maxWidth: 500,
                cursor: 'pointer',
              }}>
              <a
                href="/dashboard-system"
                target="_blank"
                alt="客製化後台/雲端資料庫"
                aria-label="客製化後台/雲端資料庫">
                <div
                  className="description"
                  style={{borderRadius: 10, marginBottom: 10}}>
                  <h3
                    style={{marginBottom: 15, color: '#884A39', fontSize: 24}}>
                    客製化後台/雲端資料庫
                  </h3>
                  <p style={{color: '#C38154', fontSize: 18}}>
                    通過顧問服務對業務需求的深入了解，我們可以提供量身定制的後台和雲端資料庫解決方案。相比於傳統的本地資料庫或套裝系統，這可以幫助企業更好地管理其數據和資源，進一步提高生產力和效率。
                  </p>
                </div>
                <div style={{color: 'black', float: 'right'}}>Read More</div>
              </a>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#F9E0BB',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                width: '65%',
                maxWidth: 500,
              }}>
              <a
                href="/web2-to-web3"
                target="_blank"
                alt="Web2/Web3 整合升級開發"
                aria-label="Web2/Web3 整合升級開發">
                <div
                  className="description"
                  style={{borderRadius: 10, marginBottom: 10}}>
                  <h3
                    style={{marginBottom: 15, color: '#884A39', fontSize: 24}}>
                    Web2/Web3 整合升級開發
                  </h3>
                  <p style={{color: '#C38154', fontSize: 18}}>
                    從 Web2 到 Web3 平順的過渡並不容易。結合過往在 Web2 及 Web3
                    的豐富經驗，深入了解業務需求，並根據行業特點和發展趨勢提供量身定制的解決方案。
                  </p>
                </div>
                <div style={{color: 'black', float: 'right'}}>Read More</div>
              </a>
            </FlexItem>
          </div>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="tech">
            <h2>技術領域</h2>
          </Element>
          <br />

          <div className="content" style={{justifyContent: 'space-around'}}>
            {[
              ['網站系統', 'WEB'],
              ['手機應用', 'APP'],
              ['物聯網', 'IoT'],
              ['區塊鏈', 'Blockchain'],
            ].map((item) => {
              return (
                <div
                  className="description"
                  style={{
                    borderRadius: 110,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#5F7161',
                    textAlign: 'center',
                    width: 220,
                    height: 220,
                    color: 'white',
                    fontSize: 20,
                    border: '0.5rem outset #7FB5FF',
                  }}
                  key={item}>
                  {item[0]}
                  <br />
                  <br />
                  {item[1]}
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div
              style={{
                maxWidth: 500,
                minWidth: 200,
                padding: 20,
              }}>
              <h3 style={{color: '#6C3428'}}>網站開發：React / GatsbyJS</h3>
              <h3 style={{color: '#6C3428'}}>APP開發：React Native</h3>
              <h3 style={{color: '#6C3428'}}>雲端開發：AWS / MongoDB</h3>
              <h3 style={{color: '#6C3428'}}>通訊技術：NFC / BLE</h3>
              <h3 style={{color: '#6C3428'}}>區塊鏈：智能合約 / 冷錢包</h3>
            </div>
          </div>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="service">
            <h2>應用情境</h2>
          </Element>
          <div className="content">
            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: 'white',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div className="description" style={{borderRadius: 10}}>
                <h3 style={{marginBottom: 10}}>數位轉型</h3>
                <h4 style={{marginBottom: 10}}>協助產業及系統轉型升級</h4>
                <p style={{color: '#3E3E3E'}}>
                  數位轉型過程往往牽涉系統的升級及擴充。本服務協助自既有系統及未來視角做通盤規劃及排除流程或功能的設計不良
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: 'white',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div className="description" style={{borderRadius: 10}}>
                <h3 style={{marginBottom: 10}}>系統規劃</h3>
                <h4 style={{marginBottom: 10}}>協助系統進行應用規劃</h4>
                <p style={{color: '#3E3E3E'}}>
                  軟體的複雜會隨時間及需求成指數增長，好的規劃至關重要。本服務協助評估既有系統狀態、協助驗收成果及規劃未來架構方向
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: 'white',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div className="description" style={{borderRadius: 10}}>
                <h3 style={{marginBottom: 10}}>技術佈局</h3>
                <h4 style={{marginBottom: 10}}>協助長期產品的技術建議</h4>
                <p style={{color: '#3E3E3E'}}>
                  面對新的軟體框架不斷出現，長期經營的事業常常面臨技術挑選的困擾。本服務根據團隊狀態及公司方向做技術佈局規劃及建議
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: 'white',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div className="description" style={{borderRadius: 10}}>
                <h3 style={{marginBottom: 10}}>商模建議</h3>
                <h4 style={{marginBottom: 10}}>基於軟體產品規劃盈利模式</h4>
                <p style={{color: '#3E3E3E'}}>
                  因應軟體架構發展，近年出現許多如訂閱制等新商業模式。本服務協助以過往經驗及技術基底提供商業模型建議協作及發展評估
                </p>
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="types">
            <h2>合作方式</h2>
          </Element>
          <div className="content">
            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#4A6089',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                width: '45%',
                maxWidth: 500,
              }}>
              <div className="description" style={{borderRadius: 10}}>
                <h3 style={{marginBottom: 15, color: '#CEAB93'}}>
                  量身定做適合您現況的專案計畫
                </h3>
                <h4 style={{marginBottom: 10, color: 'white'}}>專案式合作</h4>
                <p style={{color: 'lightgrey'}}>
                  適用於整體需求較為清楚的用戶。合作目標為根據實際需要提供專業協助，從架構分析、技術報告到開發協作皆為可討論範圍{' '}
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#4A6089',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
                width: '45%',
                maxWidth: 500,
              }}>
              <div className="description" style={{borderRadius: 10}}>
                <h3 style={{marginBottom: 15, color: '#CEAB93'}}>
                  提供符合您現況的彈性支援
                </h3>
                <h4 style={{marginBottom: 10, color: 'white'}}>時數式合作</h4>
                <p style={{color: 'lightgrey'}}>
                  適用於整體狀況不太明確的用戶。合作目標為協助釐清問題及健康度確認，藉以提高開發速度或及早發現潛在風險並有因應原則{' '}
                </p>
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="good">
            <h2>團隊優勢</h2>
          </Element>

          <div className="content">
            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#EEEDDE',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div
                className="description"
                style={{borderRadius: 10, textAlign: 'center'}}>
                <h3 style={{marginBottom: 20}}>經驗來自實務</h3>
                <p style={{color: '#3E3E3E'}}>
                  基於過往超過六十個以上方案開發協作提供協作
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#EEEDDE',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div
                className="description"
                style={{borderRadius: 10, textAlign: 'center'}}>
                <h3 style={{marginBottom: 20}}>技術實力紮實</h3>
                <p style={{color: '#3E3E3E'}}>
                  於網頁、雲端、APP、物聯網及區塊鏈皆有成果
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#EEEDDE',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div
                className="description"
                style={{borderRadius: 10, textAlign: 'center'}}>
                <h3 style={{marginBottom: 20}}>自有後勤團隊</h3>
                <p style={{color: '#3E3E3E'}}>
                  規劃內容如有需要可直接對接內部工程團隊開發
                </p>
              </div>
            </FlexItem>

            <FlexItem
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#EEEDDE',
                boxShadow: 'rgb(204 204 204) 0.125rem 0.125rem 0px 0.125rem',
              }}>
              <div
                className="description"
                style={{borderRadius: 10, textAlign: 'center'}}>
                <h3 style={{marginBottom: 20}}>領域經驗多元</h3>
                <p style={{color: '#3E3E3E'}}>
                  橫跨超過十個領域以上的顧問、開發及團隊經驗
                </p>
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="cases">
            <h2>成功案例</h2>
          </Element>

          <div
            className="content"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center', //'flex-start',
              alignItems: 'center',
              width: '100%',
            }}>
            {[
              [
                '工研院',
                'https://www.revtel.tech/static/000c3e2dd577951ddc1d79d17888a90b/6258c/ITRI.webp',
                '智能物流系統顧問開發',
                'https://medium.com/revtel-tech/複雜流程的可追蹤及電子化-港區智能物流系統-ad0a30cb342b',
              ],
              [
                '資策會',
                'https://www.revtel.tech/static/e3a00e73d9db70d5ab8539602886b7d6/159a2/III.png',
                '智能鏡顧問開發',
              ],
              [
                '加密鏈科技',
                'https://www.revtel.tech/static/b02e59ad1f3fea94f36734e735c8c9b2/6258c/inigma.webp',
                'NFC 冷錢包顧問開發',
                'https://medium.com/revtel-tech/區塊鏈實體化的技術隨想-blockchain-nfc-875ac80ba0c9',
              ],
              [
                '商業司智能商圈',
                '/images/bizlion.png',
                '區塊鏈點數發幣系統顧問開發',
                'https://medium.com/revtel-tech/智慧商圈點數及區塊鏈-點數的多種表述-c423ee46eaaf',
              ],
              [
                'BakerShell 烘焙電商',
                '/images/bakey.png',
                '烘焙產業 SAAS 電商顧問開發',
                'https://www.bakershell.com.tw/',
              ],
              ['感官文化印刷', '/images/sens.png', '電商/ERP/區塊鏈設計開發'],
              [
                '高曼計量',
                'https://www.revtel.tech/static/6adb281dd727e95fdd10717d07b19597/159a2/gamma.png',
                '美股看盤 APP 設計開發',
                'https://medium.com/revtel-tech/兼顧互動及專業的線圖-以股票看盤-軟體為例來聊聊-web-app-的合併開發-3bed0589a233',
              ],
              [
                'ADENOVO',
                'https://www.revtel.tech/static/26f601b5df8360754106e9bc404ac324/159a2/adenovo.png',
                'FinTech 產品設計開發',
              ],
              [
                '二十五電訊',
                '/images/Tel25.png',
                '電信產品設計開發',
                'https://medium.com/revtel-tech/案例分享-tel-u-電信電商-8cc7a7feefb4',
              ],
              [
                'HeCafe 好咖嚴選',
                '/images/hecafe.png',
                '咖啡相關選品平台顧問開發',
                'https://medium.com/revtel-tech/讓享受美好變成生活習慣-hecafe-好咖嚴選-422673ddfbc5',
              ],
              [
                'QriticA',
                'https://www.revtel.tech/static/938a27c4de72146887393644a7275fdd/159a2/Qritica.png',
                '思辨教育平台顧問開發',
                'https://medium.com/revtel-tech/案例分享-線上教育平台-qritica-b5974cf719c2',
              ],
              ['Merck 默克藥廠', '/images/Merck.png', '用藥追蹤系統顧問開發'],
              [
                'DSA 達詳自動化',
                '/images/dsa.png',
                '智能產線軟體顧問開發',
                'https://revteltech.pse.is/sys-design',
              ],

              [
                '青田悅產後護理之家',
                '/images/ctycare.png',
                '月子中心系統顧問開發',
              ],
              [
                '奕果雲端數位',
                'https://www.revtel.tech/static/e51af92cd09162580ad8b34c86b5309b/6258c/HiPrint.webp',
                '印刷電商/ERP 顧問開發',
                'https://medium.com/revtel-tech/印刷業專屬電商-hiprint-開發分享-以-gatsbyjs-打造高速-erp-ec-9e6a3bbfbc7b',
              ],
              [
                '法朋烘焙坊',
                '/images/lr.png',
                '烘焙電商/ERP 顧問開發',
                'https://medium.com/revtel-tech/三分鐘內數百萬業績的高流量電商煉成-le-ruban-pâtisserie-法朋烘焙甜點坊-6901f8694036',
              ],
              [
                '寬豐工業',
                '/images/real.png',
                '藍牙/NFC智能鎖顧問開發',
                'https://medium.com/revtel-tech/案例分享-傳產升級-藍牙電子鎖-809b39d97637',
              ],
              ['Pranaq', '/images/pranaq.png', '醫療雲端系統顧問'],
              [
                'HiNFT',
                '/images/hinft.png',
                '國內外多個 NFT 項目顧問開發',
                'https://medium.com/revtel-tech/技術的純粹與世界的不完美-web3-web2-的落地開發-60eaf0c0aac2',
              ],
              [
                'RealiT',
                'images/realiT-logo.png',
                'NFT 實體化方案顧問開發',
                'https://www.realitag.app/',
              ],
              ['拉亞漢堡', '/images/laya.png', '網站 & APP 點餐系統'],
              ['台北市律師公會', '/images/tba.png', '網站 & APP 系統'],
            ].map((item, idx) => {
              const withLink = item[3]
                ? (_) => (
                    <a
                      key={item[3]}
                      href={item[3]}
                      target="_blank"
                      alt={item[0] + ':' + item[2]}
                      ariaLabel={item[0] + ':' + item[2]}
                      rel="noreferrer">
                      {_}
                    </a>
                  )
                : (_) => _;

              return withLink(
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    padding: 10,
                    width: 230,
                    height: 230,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    margin: 10,
                    position: 'relative',
                  }}>
                  <div
                    style={{
                      height: 150,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <img
                      src={item[1]}
                      style={{width: 150}}
                      alt={item[0] + ':' + item[2]}
                    />
                  </div>
                  <h4 style={{fontSize: 18}}>{item[0]}</h4>
                  <h3
                    style={{
                      color: 'black',
                      marginTop: 10,
                      fontSize: 14,
                      fontWeight: 400,
                    }}>
                    {item[2]}
                  </h3>
                  {item[3] && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        backgroundColor: 'orange',
                        position: 'absolute',
                        top: 15,
                        right: 15,
                      }}
                    />
                  )}
                </div>,
              );
            })}
          </div>
        </FlexItemSection>

        <FlexItemSection
          style={{backgroundColor: '#eee', width: '100%', maxWidth: 1500}}>
          <Element name="concept">
            <h2>顧問觀點</h2>
          </Element>

          <div
            className="content"
            style={{justifyContent: 'flex-start', flexDirection: 'column'}}>
            {[
              [
                '語焉不詳未必不好？軟體開發合約那些要注意的地方',
                'https://medium.com/revtel-tech/語焉不詳未必不好-軟體開發合約那些要注意的地方-9d8bc849e189',
              ],
              [
                '軟體開發值多少？系統開發怎樣估成本',
                'https://medium.com/revtel-tech/軟體開發值多少-系統開發怎樣估成本-43e7d0fbf842',
              ],
              [
                '0 →1 ? 1 →100 ? 軟體顧問到底在顧什麼？',
                'https://medium.com/revtel-tech/0-1-1-100-軟體顧問到底在顧什麼-56d3da6e02d0',
              ],
              [
                '為什麼適合自己的電商系統這麼難找？',
                'https://medium.com/revtel-tech/為什麼適合自己的電商系統這麼難找-e99bf15928a0',
              ],
              [
                '電商爆單造成的悲劇？系統串接其實是風險交接',
                'https://medium.com/revtel-tech/電商爆單造成的悲劇-系統串接其實是風險交接-1a2546ee15f4',
              ],
              [
                '淺談系統設計的因地至宜：從產線監控軟體開發設計談起',
                'https://medium.com/revtel-tech/淺談系統設計的因地至宜-從產線監控軟體開發設計談起-a90bd6658fde',
              ],
              [
                '技術的純粹與世界的不完美：WEB3 →WEB2 的落地開發',
                'https://medium.com/revtel-tech/技術的純粹與世界的不完美-web3-web2-的落地開發-60eaf0c0aac2s',
              ],
              [
                'SEO 做多少 ? 客製化電商開發時的一些實踐經驗',
                'https://medium.com/revtel-tech/seo-做多少-客製化電商開發時的一些實踐經驗-6f6a61c10f4f',
              ],
              [
                '跨越不同領域的軟體開發經驗— 如何讓你的系統設計能真正解決問題',
                'https://medium.com/revtel-tech/跨越不同領域的軟體開發經驗-如何讓你的系統設計能真正解決問題-ed3af961fbb3',
              ],
              [
                'NFC 該如何使用？寫在 iphone 終於完整支援 NFC 讀寫的今天',
                'https://medium.com/revtel-tech/nfc-怎麼用-寫在-iphone-終於完整支援-nfc-讀寫的今天-3b88ed308a38',
              ],
              [
                '為什麼 NFC 技術值得你注意？從蘋果推出「Tap to Pay」說起',
                'https://medium.com/revtel-tech/為什麼-nfc-技術值得你注意-從蘋果推出-tap-to-pay-說起-323733adeaee',
              ],
              [
                '功能的厚度？— 從社群登入及推播說起',
                'https://medium.com/revtel-tech/功能的厚度-從社群登入及推播說起-bfc178c9a662',
              ],
            ].map((item) => {
              return (
                <a
                  href={item[1]}
                  target="_blank"
                  aria-label={item[0]}
                  alt={item[0]}
                  style={{
                    paddingLeft: 5,
                    color: '#443C68',
                    fontSize: 20,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                  rel="noreferrer">
                  {item[0]}
                </a>
              );
            })}
            <a
              href={'https://medium.com/revtel-tech'}
              target="_blank"
              style={{
                paddingLeft: 5,
                color: '#18122B',
                fontSize: 20,
                marginTop: 15,
                marginBottom: 15,
                fontWeight: 'bold',
              }}
              rel="noreferrer">
              更多資訊➚
            </a>
          </div>
        </FlexItemSection>
      </Wrapper>
    </ReactDelighters>
  );
}

function HeroBannerLogo(props) {
  return (
    <StaticImage
      src="../../images/react-icon.png"
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
  padding: 80px;
  //min-height: 320px;
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

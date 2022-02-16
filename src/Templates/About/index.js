import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {LocationOn} from '@styled-icons/material/LocationOn';
import {TravelBus} from '@styled-icons/zondicons/TravelBus';
import {Car} from '@styled-icons/boxicons-solid/Car';

function About(props) {
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');

  const [bannerDimension, setBannerDimension] = React.useState(null);

  React.useLayoutEffect(() => {
    const elem = document.getElementById('rev-banner');
    const box = elem.getBoundingClientRect();
    setBannerDimension(box);
  }, [dimension.innerWidth]);

  return (
    <Wrapper rwd={dimension.rwd} dimension={dimension}>
      <div
        id="rev-banner"
        className="banner"
        style={{
          height:
            dimension.rwd === 'desktop'
              ? bannerDimension?.width * 0.38
              : bannerDimension?.width / 1.5,
        }}>
        <img
          src="../../images/about-banner.png"
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
      <section className="section" id="intro">
        <div className="constrain-content">
          <div className="subtitle">ABOUT</div>
          <div className="title">品牌介紹</div>
          <div className="carousel-wrapper" style={{marginTop: 20}}>
            <img
              src="../../images/about1.png"
              style={{
                border: '1px solid red',
                objectFit: 'cover',
                maxWidth:
                  dimension.rwd === 'desktop'
                    ? (dimension.innerWidth - 200) / 3
                    : dimension.innerWidth - 40,
                height:
                  dimension.rwd === 'desktop'
                    ? (dimension.innerWidth - 200) / 4
                    : (dimension.innerWidth - 40) / 3,
                borderRadius: 20,
              }}
            />
            <div style={{flexBasis: 40}} />
            <div style={{flex: 1}}>
              <div className="title">關於Revteltech</div>
              <p
                className="content"
                style={{marginTop: 40, whiteSpace: 'break-spaces'}}>
                {`不實的?院保本力種化所、是在有園!的歌的天......他富一,單型做的人,家向她,身個響灣的元臺點可大新雄想華。稱是公人身時它後員。下道望是情之化到成,關上些依食讀有家。

今長出說民合發心部去處對備場但同,得失代起的有夫直力像向說生有,技形被展是:你並生然常關說想很爭媽於想城否卻車間實講快統師消人聯西了論一不裡要識,年性巴黨我念在部來情化的情自有灣學兒;說山進行為求;不身東否舉線,品日大動可天語,了題很的流境吸黃著觀計很先夫動故最條為亞要請

影日不計引縣打於向一行國師隊好健後要一。下題冷我整究歷。`}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-dark" id="consult">
        <div className="constrain-content">
          <div className="subtitle centered">CONSULT</div>
          <div className="title centered">客製化諮詢</div>
          <p
            className="content centered"
            style={{
              marginTop: 40,
            }}>{`不實的?院保本力種化所、是在有園!的歌的天......他富一,單型做的人,家向她,身個響灣的元臺點可大新雄想華。稱是公人身時它後員。下道望是情之化到成,關上些依食讀有家。

今長出說民合發心部去處對備場但同,得失代起的有夫直力像向說生有,技形被展是:你並生然常關說想很爭媽於想城否卻車間實講快統師消人聯西了論一不裡要識,年性巴黨我念在部來情化的情自有灣學兒;說山進行為求;不身東否舉線,品日大動可天語,了題很的流境吸黃著觀計很先夫動故最條為亞要請

影日不計引縣打於向一行國師隊好健後要一。下題冷我整究歷。
`}</p>
        </div>
      </section>
      <div
        id="rev-banner"
        className="banner"
        style={{height: bannerDimension?.width * 0.38}}>
        <img
          src="../../images/about2.png"
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
      <section className="section-dark" id="contact">
        <div className="constrain-content">
          <div className="subtitle">CONTACT</div>
          <div className="title">聯絡我們</div>

          <div className="carousel-wrapper" style={{marginTop: 20}}>
            <div style={{flex: 1}}>
              <div className="row">
                <LocationOn size={30} />
                <div style={{marginLeft: 12, flex: 1}}>
                  <div className="title">電話與位置</div>
                  <p className="content" style={{marginTop: 20}}>
                    02-1234-5678
                  </p>
                  <p className="content">台北市大同區民權西路136號10樓之5</p>
                </div>
              </div>

              <div className="row" style={{marginTop: 40}}>
                <TravelBus size={30} />
                <div style={{marginLeft: 12, flex: 1}}>
                  <div className="title">大眾運輸</div>
                  <p className="content" style={{marginTop: 20}}>
                    {`可搭乘捷運「松山新店線(3號線)」至台北小巨蛋站後，2號出口即達。
如搭乘捷運其他路線，可至臺北捷運公司網站【路網圖及各站資訊】中查詢轉乘資訊。`}
                  </p>
                </div>
              </div>
              <div className="row" style={{marginTop: 40}}>
                <Car size={30} />
                <div style={{marginLeft: 12, flex: 1}}>
                  <div className="title">開車路線</div>
                  <p className="content" style={{marginTop: 20}}>
                    {`國道1號(中山高速公路)：

北上建議出口：於圓山交流道(建國北路出口)下匝道，走建國北路左轉南京東路4段即可抵達。

南下建議出口：於內湖交流道(南京東路出口)下匝道，走南京東路6段接麥帥一橋，直走南京東路5段至4段即可抵達。

國道3號(福爾摩沙高速公路)：

北上建議出口：安坑交流道(朝台北方向)下匝道，走環河路，接水源快速道路及基隆路高架道路，下敦化南路匝道，左轉直走敦化南北路至南京東路4段即可抵達。

南下建議出口：木柵交流道(朝台北方向)接國道3甲下匝道，接基隆路，左轉直走敦化南北路至南京東路4段即可抵達。`}
                  </p>
                </div>
              </div>
            </div>
            <div style={{flexBasis: 20}} />
            <div style={{flex: 1, backgroundColor: '#eee'}}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.154361897947!2d121.51443241484768!3d25.062756743292475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a96eb666f215%3A0xa9535e65da02d957!2zUmV2dGVsVGVjaCDlv7vml4Xnp5HmioDogqHku73mnInpmZDlhazlj7g!5e0!3m2!1szh-TW!2stw!4v1632451011160!5m2!1szh-TW!2stw"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen={true}
                loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > .banner {
    width: 100%;
    height: 600px;
    /* position: relative; */
    /* background-color: var(--primaryColor); */
  }
`;

export default About;

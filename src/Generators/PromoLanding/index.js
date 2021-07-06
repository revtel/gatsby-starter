import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import ReactDelighters from '../../Components/ReactDelighters';
import SiteNavBar from '../../Components/SiteNavBar';
import NavBar from './NavBar';
import HeroBanner from './HeroBanner';
import FeatureGrid from './FeatureGrid';
import RowBanner from './RowBanner';
import ArticleSection from './ArticleSection';
import Fab from './Fab';
import * as AppActions from '../../AppActions';

function PromoLanding(props) {
  const {nav, contact, sections, fab} = props.pageContext;

  return (
    <ReactDelighters>
      <Helmet title={nav.title || 'RevtelTech'}>
        <meta property="og:title" content={nav.title || 'RevtelTech'} />
        <meta
          property="og:description"
          content={nav.description || 'RevtelTech'}
        />
      </Helmet>

      {(nav.global && <SiteNavBar nav={nav} />) || <NavBar nav={nav} />}

      <Wrapper>
        {sections.map((section, idx) => {
          if (section.type === 'hero') {
            return <HeroBanner key={idx} hero={section} first={idx === 0} />;
          } else if (section.type === 'feature') {
            return <FeatureGrid key={idx} feature={section} />;
          } else if (section.type === 'row') {
            return <RowBanner key={idx} row={section} />;
          } else if (section.type === 'article') {
            return <ArticleSection key={idx} id={section.id} />;
          } else if (section.type === 'custom') {
            return AppActions.renderCustomSection({
              route: props.location.pathname,
              sectionId: section.id,
              params: section,
            });
          }
          return null;
        })}

        <FlexItemSection
          style={{padding: '100px 40px', backgroundColor: '#eee'}}>
          <h3 style={{textAlign: 'center'}}>
            {nav.title || 'RevtelTech'} @ {new Date().getFullYear()}
          </h3>

          <div className="content">
            <FlexItem>
              <div className="description">
                <h3>聯絡資訊</h3>
                {contact.email && <p>Email: {contact.email}</p>}
                {contact.mobile && <p>手機: {contact.mobile}</p>}
                {contact.tel && <p>市話: {contact.tel}</p>}
                {contact.addr && <p>地址: {contact.addr}</p>}
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>

        <Fab fab={fab} />
      </Wrapper>
    </ReactDelighters>
  );
}

const Wrapper = styled.div`
  & > section {
    position: relative;
    overflow-x: hidden;
  }

  & .landing-fade {
    opacity: 0;
    transition: 350ms;
  }

  & .landing-fade.delighter.started {
    opacity: 1;
  }

  & .landing-zoom {
    opacity: 0;
    transform: scale(0);
    transition: 350ms;
  }

  & .landing-zoom.delighter.started {
    opacity: 1;
    transform: scale(1);
  }

  & .landing-slide-up {
    opacity: 0;
    transform: translateY(200px);
    transition: 200ms;
  }

  & .landing-slide-up.delighter.started {
    opacity: 1;
    transform: translateY(0px);
  }

  & .landing-slide-in-right {
    opacity: 0;
    transform: translateX(500px);
    transition: 250ms;
  }

  & .landing-slide-in-right.delighter.started {
    opacity: 1;
    transform: translateX(0px);
  }

  & .landing-slide-in-left {
    opacity: 0;
    transform: translateX(-500px);
    transition: 250ms;
  }

  & .landing-slide-in-left.delighter.started {
    opacity: 1;
    transform: translateX(0px);
  }

  & h2 {
    font-size: 32px;
  }

  & p {
    font-size: 18px;
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
      text-align: center;
      font-size: 24px;
      color: #888;
    }
    & > p {
      font-size: 18px;
      color: #aaa;
    }
  }
`;

export default PromoLanding;

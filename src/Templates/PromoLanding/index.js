import React from 'react';
import styled from 'styled-components';
import ReactDelighters from '../../Components/ReactDelighters';
import NavBar from './NavBar';
import HeroBanner from './HeroBanner';
import FeatureGrid from './FeatureGrid';
import RowBanner from './RowBanner';
import ArticleSection from './ArticleSection';

function PromoLanding(props) {
  const {nav, contact, sections} = props.pageContext;

  return (
    <ReactDelighters>
      <NavBar nav={nav} />

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
          }
          return null;
        })}

        <FlexItemSection
          style={{padding: '100px 40px', backgroundColor: '#eee'}}>
          <h3 style={{textAlign: 'center'}}>RevtelTech @ 2021</h3>

          <div className="content">
            <FlexItem>
              <div className="description">
                <h3>Contact</h3>
                {contact.email && <p>Email: {contact.email}</p>}
                {contact.mobile && <p>手機: {contact.mobile}</p>}
                {contact.tel && <p>市話: {contact.tel}</p>}
                {contact.addr && <p>地址: {contact.addr}</p>}
              </div>
            </FlexItem>
          </div>
        </FlexItemSection>
      </Wrapper>
    </ReactDelighters>
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

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import ReactDelighters from 'rev.sdk.js/Components/ReactDelighters';
import SiteNavBar from '../../Components/SiteNavBar';
import NavBar from './NavBar';

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
    </ReactDelighters>
  );
}

const Wrapper = styled.div`
  max-width: var(--contentMaxWidth);
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-top: ${({hasNavbar}) =>
    hasNavbar ? `var(--topNavBarHeight)` : `0px`};

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

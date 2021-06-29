import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';
import * as Style from './Style';

function HeroBanner(props) {
  const {hero, first} = props;
  return (
    <HeroBannerSection bg={hero.bg} first={first}>
      {hero.image && (
        <img
          src={hero.image}
          style={{width: 256, height: 256, objectFit: 'contain'}}
          alt="logo"
        />
      )}

      <h2 style={{color: hero.color}}>{hero.title}</h2>
      {hero.subtitle && <p style={{color: hero.subColor}}>{hero.subtitle}</p>}

      <ActionBtn
        link={hero.action}
        text={hero.actionText}
        type={hero.actionType}
        size={hero.actionSize}
      />
    </HeroBannerSection>
  );
}

const HeroBannerSection = styled.section`
  padding: 80px;
  min-height: ${(props) => (props.first ? '640px' : '0px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Style.Bg}
`;

export default HeroBanner;

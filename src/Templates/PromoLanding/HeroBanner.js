import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';

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

      <ActionBtn link={hero.action} text={hero.actionText} size="large" />
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.bg?.indexOf('#') === 0
      ? `
background-color: ${props.bg};
`
      : `
background-image: url(${props.bg});
`}
`;

export default HeroBanner;

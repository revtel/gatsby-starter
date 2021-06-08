import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';

function RowBanner(props) {
  const {row} = props;
  const extraProps = {};
  if (row.effect) {
    extraProps['data-delighter'] = 'start:0.7;';
    extraProps['className'] = `landing-${row.effect}`;
  }
  return (
    <RowBannerSection
      style={{backgroundColor: row.bgColor || 'white'}}
      {...extraProps}>
      <div
        className="content"
        style={{
          flexDirection: row.direction === 'left' ? 'row' : 'row-reverse',
        }}>
        <img
          src={row.image}
          alt="Logo"
          style={{width: 150, height: 150, objectFit: 'contain'}}
        />

        <div className="description" style={{marginRight: 20}}>
          <h2 style={{color: row.color}}>{row.title}</h2>
          {row.subtitle && <p style={{color: row.subColor}}>{row.subtitle}</p>}
        </div>
      </div>

      <ActionBtn link={row.action} text={row.actionText} />
    </RowBannerSection>
  );
}

const RowBannerSection = styled.section`
  padding: 40px 20px;

  & > .content {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > .description {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default RowBanner;

import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';
import * as Style from './Style';

function RowBanner(props) {
  const {row} = props;
  const extraProps = {};
  if (row.effect) {
    extraProps['data-delighter'] = 'start:0.66;';
    extraProps['className'] = `content landing-${row.effect}`;
  } else {
    extraProps['className'] = `content`;
  }
  return (
    <RowBannerSection bg={row.bg || row.bgColor || '#ffffff'}>
      <div style={{maxWidth: 800, margin: '0 auto'}}>
        <div
          style={{
            flexDirection: row.direction === 'left' ? 'row' : 'row-reverse',
          }}
          {...extraProps}>
          <img
            src={row.image}
            alt="Logo"
            style={{width: 150, height: 150, objectFit: 'contain'}}
          />

          <div className="description" style={{marginRight: 20}}>
            <h2 style={{color: row.color}}>{row.title}</h2>
            {row.subtitle && (
              <p style={{color: row.subColor}}>{row.subtitle}</p>
            )}
            <ActionBtn link={row.action} text={row.actionText} />
          </div>
        </div>
      </div>
    </RowBannerSection>
  );
}

const RowBannerSection = styled.section`
  padding: 40px 20px;

  ${Style.Bg}

  & .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & .description {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default RowBanner;

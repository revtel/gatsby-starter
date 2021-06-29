import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';
import * as Style from './Style';

function RectRowBanner(props) {
  const {row} = props;
  return (
    <Wrapper bg={row.bg || row.bgColor || '#ffffff'} row={row}>
      <div style={{maxWidth: 1440, margin: '0 auto'}}>
        <div className="content">
          <img src={row.image} alt="Logo" />

          <div className="description">
            <h2 style={{color: row.color}}>{row.title}</h2>
            {row.subtitle && (
              <p style={{color: row.subColor}}>{row.subtitle}</p>
            )}
            <ActionBtn
              link={row.action}
              text={row.actionText}
              type={row.actionType}
              size={row.actionSize}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${Style.Bg}

  & .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    & img {
      height: 360px;
      object-fit: cover;
    }

    & .description {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }
  }

  @media only screen and (min-width: 960px) {
    & .content {
      flex-direction: ${(props) =>
        props.row.direction === 'left' ? 'row' : 'row-reverse'};

      & img {
        width: 480px;
        height: 360px;
        object-fit: cover;
      }

      & .description {
        align-self: stretch;
        align-items: flex-start;
        flex: 1;
        padding: 70px;
      }
    }
  }

  @media only screen and (min-width: 1200px) {
    & .content {
      & img {
        width: 600px;
        height: 450px;
      }
    }
  }
`;

export default RectRowBanner;

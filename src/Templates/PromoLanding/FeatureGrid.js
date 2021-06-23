import React from 'react';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';
import * as Style from './Style';

function FeatureGrid(props) {
  const {feature} = props;
  return (
    <Wrapper bg={feature.bg || feature.bgColor || '#ffffff'}>
      {feature.title && (
        <h2 style={{color: feature.color, textAlign: 'center'}}>
          {feature.title}
        </h2>
      )}
      {feature.subtitle && (
        <p style={{color: feature.subColor, textAlign: 'center'}}>
          {feature.subtitle}
        </p>
      )}
      <FlexItemSection>
        <div className="content">
          {feature.items.map((item, idx) => (
            <FlexItem key={idx} style={{width: 300, flex: 0}}>
              <img
                src={item.image}
                alt="Logo"
                style={{width: 180, height: 180, objectFit: 'contain'}}
              />

              <div className="description">
                <h3 style={{textAlign: 'center', color: feature.color}}>
                  {item.title}
                </h3>
                <p style={{textAlign: 'center', color: feature.subColor}}>
                  {item.subtitle}
                </p>
              </div>

              <ActionBtn link={item.action} text={item.actionText} />
            </FlexItem>
          ))}
        </div>
      </FlexItemSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px 0;
  ${Style.Bg}
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
      font-size: 24px;
      color: #888;
    }
    & > p {
      font-size: 18px;
      color: #ccc;
    }
  }
`;

export default FeatureGrid;

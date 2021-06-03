import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {withLoginRequired} from './LoginRequired';

function CheckoutLayout(props) {
  const [actions] = useOutlet('actions');
  const params = qs.parse(props.location.search);

  function renderCustomSection(sectionId) {
    return actions.renderCustomSection({
      route: props.location.pathname,
      sectionId,
      params,
    });
  }

  return (
    <Wrapper>
      {renderCustomSection('A')}

      <div className="content">
        {renderCustomSection('B')}

        {props.children}

        {renderCustomSection('J')}
      </div>

      {renderCustomSection('K')}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWith);
    margin: 0 auto;
    padding: var(--basePadding);
  }
`;

export default withLoginRequired(CheckoutLayout);

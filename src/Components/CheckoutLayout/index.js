import {useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {Steps} from 'antd';
import React from 'react';
import * as AppActions from '../../AppActions';
import styled from 'styled-components';
import {withLoginRequired} from 'rev.sdk.js/Components/LoginRequired';
import SiteNavBar from '../SiteNavBar';
import LoginRequired from '../LoginRequired';

function CheckoutLayout(props) {
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');
  const {style = {}} = props;
  const route = props.location.pathname;
  const params = qs.parse(props.location.search);

  function renderCustomSection(sectionId) {
    const subRoute = route.split('/')[2];
    let current = 0;

    if (subRoute === 'info') {
      current = 1;
    } else if (subRoute === 'review') {
      current = 2;
    }

    if (sectionId === 'B') {
      return (
        <Steps
          direction={dimension.rwd === 'mobile' ? 'vertical' : 'horizontal'}
          type="navigation"
          current={current}
          style={{marginBottom: 20}}>
          <Steps.Step title="購物車" />
          <Steps.Step title="寄送資訊" />
          <Steps.Step title="付款" />
        </Steps>
      );
    }

    return null;
  }

  return (
    <Wrapper style={{...style}}>
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
    max-width: var(--contentMaxWidth);
    min-height: var(--contentMinHeight);
    margin: 0 auto;
    padding: var(--basePadding);
  }
`;

export default withLoginRequired(CheckoutLayout, {
  admin: false,
  SiteNavBar,
  renderLoginRequired: LoginRequired,
});

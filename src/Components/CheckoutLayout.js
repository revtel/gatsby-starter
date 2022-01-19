import React from 'react';
import styled from 'styled-components';
import {getOutlet, useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {withLoginRequired} from 'rev.sdk.js/Components/LoginRequired';
import SiteNavBar from '../Components/SiteNavBar';
import {Button, Result, Space, Steps} from 'antd';
import * as AppActions from '../AppActions';

function CheckoutLayout(props) {
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');
  const {style = {}} = props;
  const params = qs.parse(props.location.search);

  function renderCustomSection({route, sectionId, params}) {
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
  }

  const _renderCustomSection = React.useCallback(
    (sectionId) => {
      if (renderCustomSection && typeof renderCustomSection === 'function') {
        return renderCustomSection({
          route: props.location.pathname,
          sectionId,
          params,
        });
      }
      // customRenderFunc backward compatibility
      if (AppActions.renderCustomSection) {
        return AppActions.renderCustomSection({
          route: props.location.pathname,
          sectionId,
          params,
        });
      }

      return null;
    },
    [params, props.location.pathname, renderCustomSection],
  );

  return (
    <Wrapper style={{...style}}>
      {_renderCustomSection('A')}

      <div className="content">
        {_renderCustomSection('B')}

        {props.children}

        {_renderCustomSection('J')}
      </div>

      {_renderCustomSection('K')}
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
  renderLoginRequired: (options) => {
    const loginModal = getOutlet('login-modal');
    return (
      <div
        style={{
          minHeight: 'var(--contentMinHeight)',
          paddingTop: 'var(--topNavBarHeight)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Result
          icon={
            <img
              style={{width: 150}}
              src="/permission-denied.gif"
              alt="permission-denied"
            />
          }
          title="尚無權限"
          subTitle="此頁面需要登入，方能瀏覽"
          extra={
            <Space direction="vertical">
              <Button
                onClick={() => {
                  loginModal.update(true);
                }}>
                登入
              </Button>
            </Space>
          }
        />
      </div>
    );
  },
});

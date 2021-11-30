import React from 'react';
import styled from 'styled-components';
import {getOutlet, useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {withLoginRequired} from 'rev.sdk.js/Components/LoginRequired';
import SiteNavBar from '../Components/SiteNavBar';
import {Result, Space, Button} from 'antd';

function CheckoutLayout(props) {
  const [actions] = useOutlet('actions');
  const {style = {}} = props;
  const params = qs.parse(props.location.search);

  function renderCustomSection(sectionId) {
    return actions.renderCustomSection({
      route: props.location.pathname,
      sectionId,
      params,
    });
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
  renderLoginRequired: (options) => {
    const loginModal = getOutlet('login-modal');
    return (
      <div
        style={{
          minHeight: 'var(--contentMinHeight)',
          paddingTop: 'var(--topNavBarHeight)',
        }}>
        <Result
          title={`尚無權限`}
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

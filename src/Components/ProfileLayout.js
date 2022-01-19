import React from 'react';
import styled from 'styled-components';
import {getOutlet, useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {withLoginRequired} from 'rev.sdk.js/Components/LoginRequired';
import SiteNavBar from '../Components/SiteNavBar';
import ProfileMenu, {ProfileTabs} from './ProfileMenu';
import {Result, Space, Button} from 'antd';
import * as AppActions from '../AppActions';

function ProfileLayout(props) {
  const {style = {}} = props;
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');
  const activePath = props.location.pathname.split('/')[2];
  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

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

  function renderCustomSection(sectionId) {
    return null;
  }

  return (
    <Wrapper style={{...style}}>
      {_renderCustomSection('A')}

      <div className="content">
        {_renderCustomSection('B')}

        <div
          style={{display: 'flex', flexDirection: mobile ? 'column' : 'row'}}>
          {mobile ? (
            <ProfileTabs activePath={activePath} />
          ) : (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {_renderCustomSection('C')}

              <ProfileMenu activePath={activePath} />

              {_renderCustomSection('D')}
            </div>
          )}

          <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            {_renderCustomSection('E')}

            <div style={{padding: 'var(--basePadding)'}}>{props.children}</div>
          </div>
        </div>

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

export default withLoginRequired(ProfileLayout, {
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

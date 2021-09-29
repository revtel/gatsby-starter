import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import qs from 'query-string';
import {withLoginRequired} from 'rev.sdk.js/Components/LoginRequired';
import SiteNavBar from '../Components/SiteNavBar';
import ProfileMenu, {ProfileTabs} from './ProfileMenu';

function ProfileLayout(props) {
  const {style = {}} = props;
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');
  const activePath = props.location.pathname.split('/')[2];
  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

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

        <div
          style={{display: 'flex', flexDirection: mobile ? 'column' : 'row'}}>
          {mobile ? (
            <ProfileTabs activePath={activePath} />
          ) : (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {renderCustomSection('C')}

              <ProfileMenu activePath={activePath} />

              {renderCustomSection('D')}
            </div>
          )}

          <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            {renderCustomSection('E')}

            <div style={{padding: 'var(--basePadding)'}}>{props.children}</div>
          </div>
        </div>

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

export default withLoginRequired(ProfileLayout, {
  admin: false,
  SiteNavBar,
});

import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import {Button} from 'antd';
import qs from 'query-string';
import {withLoginRequired} from './LoginRequired';
import ProfileMenu from './ProfileMenu';

function ProfileLayout(props) {
  const [actions] = useOutlet('actions');
  const [dimension] = useOutlet('dimension');
  const [mobileFilterVisible, setMobileFilterVisible] = React.useState(false);
  const activePath = props.location.pathname.split('/')[2];
  const params = qs.parse(props.location.search);
  const mobile = dimension.rwd === 'mobile';

  React.useEffect(() => {
    setMobileFilterVisible(false);
  }, [activePath]);

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

        <div style={{display: 'flex'}}>
          {!mobile && (
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

      {mobile && (
        <MobileFilter visible={mobileFilterVisible}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {renderCustomSection('C')}

            <ProfileMenu activePath={activePath} />

            {renderCustomSection('D')}
          </div>
        </MobileFilter>
      )}

      {mobile && (
        <MobileMenuBtn
          onClick={() => setMobileFilterVisible(!mobileFilterVisible)}>
          <Button type="primary">選單</Button>
        </MobileMenuBtn>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: var(--contentMaxWith);
    margin: 0 auto;
  }
`;

const MobileMenuBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const MobileFilter = styled.div`
  z-index: 100;
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: 100vh;
  transform: ${(props) =>
    props.visible ? 'translateX(0px)' : 'translateX(-300px)'};
  transition: 180ms;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export default withLoginRequired(ProfileLayout);

import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';

function ProfilePage(props) {
  const [user] = useOutlet('user');

  return (
    <Wrapper>
      <h2>個人資訊</h2>
      <div>Username: {user.username}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default ProfilePage;

import React from 'react';
import styled from 'styled-components';
import {Button, Result, Space} from 'antd';
import {useOutlet} from 'reconnect.js';

const Empty = () => {
  const [actions] = useOutlet('actions');
  return (
    <Wrapper>
      <Result
        icon={<img src="/empty.gif" alt="empty" />}
        title="敬請期待"
        subTitle="此頁面目前沒有資料"
        extra={
          <Space direction="vertical">
            <Button
              onClick={async () => {
                await actions.navigate('/');
              }}>
              前往首頁
            </Button>
          </Space>
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 150px;
  }
`;

export default Empty;

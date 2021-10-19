import React from 'react';
import styled from 'styled-components';
import {Button, Input, Form} from 'antd';
import {useOutlet} from 'reconnect.js';
import Config from '../../../data.json';
import CountdownTimer from '../../Components/CountdownTimer';

function RequestPage(props) {
  const [actions] = useOutlet('actions');
  const [requestResult, setRequestResult] = React.useState(null);
  const [endTime, setEndTime] = React.useState(0);

  const onFinish = async (values) => {
    const {username} = values;

    try {
      actions.setLoading(true);
      await actions.registerRequest(username);
      setEndTime(new Date().getTime() + 2 * 60 * 1000);
      setRequestResult(true);
    } catch (ex) {
      console.log('EX', ex);
      alert('API failed, register request failed');
      setRequestResult(false);
    } finally {
      actions.setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const disableInput = requestResult === true;

  return (
    <Wrapper>
      <div className="content">
        <h2 style={{marginBottom: 10}}>註冊新帳號</h2>

        {requestResult === true && (
          <div
            style={{
              padding: 15,
              borderRadius: 6,
              backgroundColor: '#eee',
              marginBottom: 15,
            }}>
            <h3 style={{marginBottom: 10}}>成功</h3>
            <p>請到您申請的信箱點擊認證連結, 完成註冊流程!</p>
          </div>
        )}

        {requestResult === false && (
          <div
            style={{
              padding: 15,
              borderRadius: 6,
              backgroundColor: '#eee',
              marginBottom: 15,
            }}>
            <h3 style={{marginBottom: 10}}>失敗</h3>
            <p>註冊請求失敗, 請重新嘗試一次</p>
          </div>
        )}

        <Form
          layout="vertical"
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="EMAIL"
            name="username"
            rules={[
              {
                required: true,
                message: '請輸入EMAIL!',
              },
            ]}>
            <Input disabled={disableInput} />
          </Form.Item>

          <CountdownTimer
            endTimeMs={endTime}
            renderText={(secRemaining) => {
              return `請於 ${secRemaining} 內完成認證`;
            }}
            style={{textAlign: 'right'}}>
            <Form.Item style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">
                {requestResult === true ? '重傳認證信' : '註冊'}
              </Button>
            </Form.Item>
          </CountdownTimer>
        </Form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--topNavBarHeight);

  & > .content {
    max-width: 600px;
    margin: 20px auto;
    padding: var(--basePadding);
  }
`;

export default RequestPage;

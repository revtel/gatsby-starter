import React from 'react';
import qs from 'query-string';
import styled from 'styled-components';
import {Card, Button, Space, Avatar, message, Image, Descriptions} from 'antd';
import {CopyAlt} from '@styled-icons/boxicons-regular/CopyAlt';
import * as Cart from 'rev.sdk.js/Actions/Cart';

const AdminSelectCVSPage = (props) => {
  const queryParams = qs.parse(props.location.search);
  const show = queryParams?.MerchantID;
  const onCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      message.success(`已複製`);
    } catch (err) {
      console.log(err);
      message.warn(`無法複製`);
    }
  };
  return (
    <Wrapper>
      <Card>
        <Space direction="vertical" style={{width: '100%'}}>
          {show && (
            <Card>
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  src={Cart.CVS_ICON[queryParams.LogisticsSubType]}
                  className="icon"
                />
              </div>
              <Descriptions bordered>
                {Object.entries(queryParams).map(([key, value], index) => {
                  return (
                    <Descriptions.Item key={index} label={key} span={2}>
                      <Space>
                        <div>{value}</div>
                        <CopyAlt
                          onClick={async () => {
                            await onCopy(value);
                          }}
                          key="copy"
                          size={20}
                          color="#000"
                          className="clickable"
                        />
                      </Space>
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Card>
          )}
          <div style={{display: 'grid', placeItems: 'center'}}>
            <Button
              type="primary"
              htmlType="button"
              onClick={() => {
                //TODO: select cvs
              }}>
              {show ? '更換超商' : '選取超商'}
            </Button>
          </div>
        </Space>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  & .clickable {
    cursor: pointer;
    transition: all 400ms ease;
    &:hover {
      transform: scale(1.2);
    }
  }
  & .icon {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

export default AdminSelectCVSPage;

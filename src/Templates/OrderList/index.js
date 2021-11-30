import React, {Fragment} from 'react';
import {useOutlet} from 'reconnect.js';
import * as AppActions from '../../AppActions';
import * as JStorageActions from 'rev.sdk.js/Actions/JStorage';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import CartList from 'rev.sdk.js/Components/CartList';
import GenericResource from 'rev.sdk.js/Generic/Resource';
import moment from 'moment';
import numeral from 'numeral';
import {Avatar, Card, Collapse, Form, Input} from 'antd';
import qs from 'query-string';
import styled from 'styled-components';

const {Panel} = Collapse;

const PAYMENT_STATUS = {
  pending: 'pending',
  waiting: 'waiting',
  success: 'success',
  failure: 'failure',
};

const PAYMENT_STATUS_DISPLAY = {
  [PAYMENT_STATUS.pending]: {
    key: 'pending',
    label: '尚未付款',
  },
  [PAYMENT_STATUS.waiting]: {
    key: 'waiting',
    label: '款項確認中',
  },
  [PAYMENT_STATUS.success]: {
    key: 'success',
    label: '付款成功',
  },
  [PAYMENT_STATUS.failure]: {
    key: 'failure',
    label: '付款失敗',
  },
};

const Filed = (props) => {
  const {name, value, addonBefore = null, addonAfter = null} = props;
  return (
    <Form.Item
      colon={false}
      label={name}
      labelAlign="left"
      style={{display: 'flex', flexDirection: 'column'}}>
      <Input
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        value={value}
        disabled
      />
    </Form.Item>
  );
};

const OrderDetail = (props) => {
  const {instance} = props;

  if (!instance) {
    return null;
  }

  return (
    <StyledWrapper>
      <Collapse defaultActiveKey={[1]}>
        <Panel header="訂單內容" key={1}>
          <CartList cartItems={instance.items} disabled={true} />
        </Panel>
        <Panel header="訂單資訊" key={5}>
          <Filed name="訂單編號" value={instance.order_id} />
          <Filed name="訂單總金額" value={instance.total} />
          <Filed
            name="訂單日期"
            value={moment(instance.created).format('YYYY-MM-DD hh:mm')}
          />
          <Filed
            name="金流狀態"
            value={
              PAYMENT_STATUS_DISPLAY[instance.payment_status]?.label ||
              '尚未定義'
            }
          />
        </Panel>
        <Panel header="購買人資訊" key={2}>
          <Filed name="購買人姓名" value={instance.buyer_name} />
          <Filed name="購買人電話" value={instance.buyer_phone} />
          <Filed name="購買人信箱" value={instance.buyer_email} />
          {!!instance.buyer_address && (
            <Filed
              name="購賣人地址"
              value={instance.buyer_address}
              addonBefore={
                <span>
                  {`${instance.buyer_zip} ${instance.buyer_city} ${instance.buyer_district}`}
                </span>
              }
            />
          )}
          {!!instance.buyer_tel && (
            <Filed
              name="市話"
              value={instance.buyer_tel}
              addonAfter={<span>分機號碼 {instance.buyer_tel_ext}</span>}
            />
          )}
        </Panel>
        <Panel header="收件人資訊" key={3}>
          <Filed name="收件人姓名" value={instance.receiver_name} />
          <Filed name="收件人電話" value={instance.receiver_phone} />
          <Filed name="收件人信箱" value={instance.receiver_email} />
          {!!instance.receiver_address && (
            <Filed
              name="收件人地址"
              value={instance.receiver_address}
              addonBefore={
                <span>
                  {`${instance.receiver_zip} ${instance.receiver_city} ${instance.receiver_district}`}
                </span>
              }
            />
          )}
          {!!instance.receiver_tel && (
            <Filed
              name="市話"
              value={instance.receiver_tel}
              addonAfter={<span>分機號碼 {instance.receiver_tel_ext}</span>}
            />
          )}
        </Panel>
        <Panel header="物流資訊" key={4}>
          <Filed
            name="物流方式"
            value={Cart.LOGISTICS_TYPE_DISPLAY[instance.logistics_type].label}
          />

          <Filed
            name="取件方式"
            value={
              Cart.LOGISTICS_SUBTYPE_DISPLAY[instance.logistics_subtype].label
            }
          />
          {instance.logistics_type === Cart.LOGISTICS_TYPE.home && (
            <Fragment>
              <Filed
                name="收件地址"
                value={instance.receiver_address}
                addonBefore={
                  <span>
                    {`${instance.receiver_zip} ${instance.receiver_city} ${instance.receiver_district}`}
                  </span>
                }
              />
            </Fragment>
          )}

          {instance.logistics_type === Cart.LOGISTICS_TYPE.cvs && (
            <Fragment>
              <Card style={{marginBottom: 10}}>
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      src={Cart.CVS_ICON[instance.logistics_subtype]}
                    />
                  }
                  title={instance.extra_data.CVSStoreName}
                  description={instance.extra_data.CVSAddress}
                />
              </Card>
            </Fragment>
          )}
          <Filed
            name="付款方式"
            value={
              Cart.PAYMENT_SUBTYPE_DISPLAY?.[instance.payment_subtype]?.label ||
              '尚未定義'
            }
          />
        </Panel>
        <Panel header="發票資訊" key={6}>
          {!!instance?.invoice_category && (
            <Filed
              name="發票種類"
              value={
                Cart.INVOICE_CATEGORY_DISPLAY?.[instance?.invoice_category]
                  ?.label
              }
            />
          )}
          {instance?.invoice_category === Cart.INVOICE_CATEGORY.b2c && (
            <Fragment>
              <Filed
                name="是否捐贈"
                value={
                  Cart.INVOICE_DONATION_DISPLAY?.[instance?.invoice_donation]
                    ?.label
                }
              />
              {instance?.invoice_donation === Cart.INVOICE_DONATION.t && (
                <Filed name="愛心捐贈碼" value={instance?.invoice_love_code} />
              )}

              {instance?.invoice_donation === Cart.INVOICE_DONATION.f && (
                <Fragment>
                  <Filed
                    name="載具種類"
                    value={
                      Cart.INVOICE_CARRIER_TYPE_DISPLAY?.[
                        instance?.invoice_carrier_type
                      ]?.label
                    }
                  />
                  {(instance?.invoice_carrier_type ===
                    Cart.INVOICE_CARRIER_TYPE.cdc ||
                    instance?.invoice_carrier_type ===
                      Cart.INVOICE_CARRIER_TYPE.mobile) && (
                    <Filed
                      name="載具條碼"
                      value={instance?.invoice_carrier_num}
                    />
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
          {instance?.invoice_category === Cart.INVOICE_CATEGORY.b2b && (
            <Fragment>
              <Filed name="統一編號號碼" value={[instance?.invoice_uni_no]} />
            </Fragment>
          )}
          {instance?.invoice_detail && (
            <Fragment>
              <Filed
                name="發票狀態"
                value={[instance?.invoice_detail.RtnMsg]}
              />
              <Filed
                name="發票號碼"
                value={[instance?.invoice_detail?.InvoiceNo || '']}
              />
              <Filed
                name="發票隨機碼"
                value={[instance?.invoice_detail?.RandomNumber || '']}
              />
            </Fragment>
          )}
        </Panel>
        <Panel header="其他資訊" key={7}>
          <Filed name="備註" value={instance.order_note || '無'} />
        </Panel>
      </Collapse>
    </StyledWrapper>
  );
};

const OrderPage = (props) => {
  const {location} = props;
  const [user] = useOutlet('user');
  const queryParams = qs.parse(location.search);

  const getQuery = (queryParams) => {
    if (queryParams?.order_number) {
      return {
        key: 'order_number',
        value: queryParams?.order_number,
      };
    } else if (queryParams?.order_id) {
      return {
        key: 'order_id',
        value: queryParams?.order_id,
      };
    } else {
      return {
        key: 'id',
        value: queryParams?.id,
      };
    }
  };

  return (
    <GenericResource
      resourceTableProps={{
        scroll: {x: 500},
      }}
      style={{padding: 0}}
      querySpec={{
        pageSizeOptions: [10],
        sortOptions: [
          {name: '日期近到遠', value: 'created'},
          {name: '日期遠到近', value: '-created'},
        ],
        canSearch: false,
      }}
      spec={{
        path: '/profile/orders',
        name: '訂單',
        primaryKey: 'id',
        canPaging: true,
        actions: {
          setLoading: AppActions.setLoading,
          fetchRecords: async ({sort, paging}) => {
            return JStorageActions.fetchDocuments(
              'order',
              {owner: user.sub},
              sort ? [sort] : [],
              paging,
              null,
            );
          },
          fetchRecordById: async () => {
            const query = getQuery(queryParams);
            return await JStorageActions.fetchOneDocument('order', {
              [query.key]: query.value,
            });
          },
        },
        columns: [
          {
            title: '訂單編號',
            key: 'order_id',
            dataIndex: 'order_id',
          },
          {
            title: '總金額',
            key: 'total',
            dataIndex: 'total',
            render: (value) => {
              return <div>$ {numeral(value).format('0,0')}</div>;
            },
          },
          {
            title: '訂購日期',
            key: 'created',
            dataIndex: 'created',
            render: (value) => {
              return <div>{moment(value).format('YYYY-MM-DD')}</div>;
            },
          },
        ],
      }}
      renderCreateButton={null}
      renderDeleteButton={null}
      renderDetail={OrderDetail}
      {...props}
    />
  );
};

const StyledWrapper = styled.div`
  margin: 10px 0;
`;

export default OrderPage;

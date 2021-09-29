import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as AppActions from '../../AppActions';
import * as JStorageActions from 'rev.sdk.js/Actions/JStorage';
import * as Cart from 'rev.sdk.js/Actions/Cart';
import CartList from 'rev.sdk.js/Components/CartList';
import GenericForm from 'rev.sdk.js/Generic/Form';
import GenericResource from 'rev.sdk.js/Generic/Resource';
import moment from 'moment';
import numeral from 'numeral';
import {Collapse, Form, Input} from 'antd';
import qs from 'query-string';

const {Panel} = Collapse;

function Filed(props) {
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
}

const FormSpec = {
  schema: {
    title: '',
    type: 'object',
    properties: {
      order_id: {
        type: 'string',
        title: '訂單編號',
        readOnly: true,
      },
      order_note: {
        type: 'string',
        title: '訂單備註',
        readOnly: true,
      },
      total: {
        type: 'string',
        title: '訂單總金額',
        readOnly: true,
      },
      created: {
        type: 'string',
        title: '訂單日期',
        readOnly: true,
      },
      payment_status: {
        type: 'string',
        title: '金流狀態',
        readOnly: true,
      },
    },
  },
  uiSchema: {
    created: {
      'ui:widget': 'date',
    },
  },
};

function OrderDetail(props) {
  const {instance} = props;

  return (
    <div style={{maxWidth: 744}}>
      <GenericForm
        schema={FormSpec.schema}
        uiSchema={FormSpec.uiSchema}
        instance={instance}
        renderCustomSubmitButton={null}
      />
      <Collapse defaultActiveKey={[1]}>
        <Panel header="訂單內容" key={1}>
          <CartList cartItems={instance.items} disabled={true} />
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
          <Filed
            name="付款方式"
            value={
              Cart.PAYMENT_SUBTYPE_DISPLAY?.[instance.payment_subtype]?.label ||
              '尚未定義'
            }
          />
        </Panel>
      </Collapse>
    </div>
  );
}

function OrderPage(props) {
  const [user] = useOutlet('user');
  const {location} = props;
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
      renderDeleteButton={null}
      style={{padding: 0}}
      querySpec={{
        pageSizeOptions: [10],
        sortOptions: [
          {name: '價錢低到高', value: 'total'},
          {name: '價錢高到低', value: '-total'},
          {name: '日期近到遠', value: 'created'},
          {name: '日期遠到近', value: '-created'},
        ],
        canSearch: false,
      }}
      spec={{
        path: '/profile/orders',
        name: '訂單',
        primaryKey: 'order_number',
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
      renderCreateButton={() => null}
      renderDetail={OrderDetail}
      {...props}
    />
  );
}

export default OrderPage;

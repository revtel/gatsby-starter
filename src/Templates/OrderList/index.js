import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as Generic from '../../Generic';

const FormSpec = {
  schema: {
    title: '',
    type: 'object',
    properties: {
      name: {type: 'string', title: '商品名稱', readOnly: true},
      amount: {type: 'number', title: '商品價錢', default: 100, readOnly: true},
    },
  },
  uiSchema: {},
};

function Form(props) {
  const {instance} = props;

  return (
    <Generic.Form
      schema={FormSpec.schema}
      uiSchema={FormSpec.uiSchema}
      instance={instance}
    />
  );
}

function OrderPage(props) {
  const [actions] = useOutlet('actions');

  return (
    <Generic.Resource
      style={{padding: 0}}
      spec={{
        path: '/profile/orders',
        name: '訂單',
        primaryKey: 'id',
        actions: {
          setLoading: actions.setLoading,
          fetchRecords: actions.fetchOrders,
          fetchRecordById: actions.fetchOrderById,
        },
        columns: [
          {
            title: '名稱',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '價錢',
            key: 'amount',
            dataIndex: 'amount',
          },
        ],
      }}
      renderCreateButton={() => null}
      renderDetail={Form}
      {...props}
    />
  );
}

export default OrderPage;

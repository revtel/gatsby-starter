import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as Generic from '../../Generic';

const FormSpec = {
  schema: {
    title: '',
    type: 'object',
    required: ['name', 'price', 'stock'],
    properties: {
      name: {type: 'string', title: '商品名稱'},
      price: {type: 'number', title: '商品價錢', default: 100},
      stock: {
        title: '庫存',
        type: 'number',
        default: 0,
      },
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
      onSubmit={(formData) => {
        console.log('onSubmit', formData);
      }}
    />
  );
}

function Dashboard(props) {
  const [actions] = useOutlet('actions');

  return (
    <Generic.Resource
      spec={{
        path: '/dashboard',
        name: '產品',
        primaryKey: 'id',
        actions: {
          setLoading: actions.setLoading,
          fetchRecords: actions.fetchRecords,
          fetchRecordById: actions.fetchRecordById,
        },
        columns: [
          {
            title: '名稱',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '價錢',
            key: 'price',
            dataIndex: 'price',
          },
          {
            title: '庫存',
            key: 'stock',
            dataIndex: 'stock',
          },
        ],
      }}
      renderDetail={Form}
      {...props}
    />
  );
}

export default Dashboard;

import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as Generic from '../../Generic';
import * as AppActions from '../../AppActions';
import * as JStorageActions from '../../Actions/JStorage';

const FormSpec = {
  schema: {
    title: '',
    type: 'object',
    properties: {
      id: {type: 'id', title: 'id', readOnly: true},
      total: {type: 'total', title: 'total', default: 100, readOnly: true},
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
  const [user] = useOutlet('user');

  return (
    <Generic.Resource
      style={{padding: 0}}
      spec={{
        path: '/profile/orders',
        name: '訂單',
        primaryKey: 'id',
        actions: {
          setLoading: AppActions.setLoading,
          fetchRecords: () => {
            return JStorageActions.fetchDocuments(
              'order',
              {owner: user.sub},
              null,
              null,
              null,
            );
          },
          fetchRecordById: (id) => {
            return JStorageActions.fetchOneDocument('order', {id});
          },
        },
        columns: [
          {
            title: 'id',
            key: 'id',
            dataIndex: 'id',
          },
          {
            title: '價錢',
            key: 'total',
            dataIndex: 'total',
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

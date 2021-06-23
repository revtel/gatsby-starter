import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as Generic from '../../Generic';
import {message, Button} from 'antd';
import {removeAutoFields} from '../../Utils/JStorageUtil';
import ImageUpload from '../../Components/ImageUpload';
import Config from '../../../data.json';

const FormSpec = {
  schema: {
    title: '',
    type: 'object',
    required: ['name', 'price'],
    properties: {
      name: {type: 'string', title: '商品名稱'},
      price: {type: 'number', title: '商品價錢', default: 100},
      public: {type: 'boolean', title: '公開', default: false},
      description: {type: 'string', title: '產品說明'},
      labels: {
        type: 'array',
        title: '分類標籤',
        items: {
          type: 'string',
        },
      },
      intro: {type: 'string', title: '產品介紹'},
      spec: {type: 'string', title: '產品規格'},
      remark: {type: 'string', title: '產品備註'},
      article: {type: 'string', title: '產品文章'},
      searchText: {type: 'string', title: '搜尋關鍵字'},
      images: {
        type: 'array',
        title: '產品圖片',
        items: {
          type: 'string',
        },
      },
    },
  },
  uiSchema: {
    description: {'ui:widget': 'textarea'},
    intro: {'ui:widget': 'textarea'},
    spec: {'ui:widget': 'textarea'},
    remark: {'ui:widget': 'textarea'},
    searchText: {'ui:widget': 'textarea'},
  },
};

function Form(props) {
  const [actions] = useOutlet('actions');
  const [user] = useOutlet('user');
  const {instance} = props;

  function goToArticle(id) {
    if (!id) {
      window.open(`${Config.articleEditorHost}?token=${user.token}`, '_blank');
    } else {
      window.open(
        `${Config.articleEditorHost}?token=${user.token}&id=${id}`,
        '_blank',
      );
    }
  }

  return (
    <div>
      <Generic.Form
        schema={FormSpec.schema}
        uiSchema={FormSpec.uiSchema}
        instance={instance}
        onSubmit={async (formData) => {
          try {
            actions.setLoading(true);
            if (!instance) {
              await actions.createDocument('product', formData);
            } else {
              await actions.updateDocument(
                'product',
                {id: instance.id},
                removeAutoFields(formData),
              );
            }
            message.success('成功!');
          } catch (ex) {
            message.error('API failure');
          } finally {
            actions.setLoading(false);
          }
        }}
      />

      <div
        style={{
          marginTop: 10,
          borderTop: '1px solid #ccc',
          padding: '15px 0',
        }}>
        <h3>工具列</h3>
        <div style={{marginTop: 10}}>
          <ImageUpload />
          <Button style={{marginLeft: 8}} onClick={() => goToArticle()}>
            創建文章
          </Button>
          <Button
            style={{marginLeft: 8}}
            disabled={!(instance && instance.article)}
            onClick={() => goToArticle(instance && instance.article)}>
            編輯文章
          </Button>
        </div>
      </div>
    </div>
  );
}

function Dashboard(props) {
  const [actions] = useOutlet('actions');

  return (
    <Generic.Resource
      spec={{
        path: '/admin/products',
        name: '產品',
        primaryKey: 'id',
        actions: {
          setLoading: actions.setLoading,
          fetchRecords: () => actions.fetchDocuments('product'),
          fetchRecordById: (id) => actions.fetchOneDocument('product', {id}),
        },
        searchFields: [],
        columns: [
          {
            title: '名稱',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '公開',
            key: 'public',
            render: (_, record) => <div>{record.public ? '是' : '否'}</div>,
          },
          {
            title: '價錢',
            key: 'price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
          },
        ],
      }}
      renderDetail={(props) => <Form {...props} />}
      {...props}
    />
  );
}

export default Dashboard;

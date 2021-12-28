import React from 'react';
import AdminResource from 'rev.sdk.js/Generators/AdminResource';
import {Button, message, Tag} from 'antd';
import {useOutlet} from 'reconnect.js';
import {ATTRIBUTE_DISPLAY} from '../../constants';

function AdminResourcePage(props) {
  const {path, pageContext} = props;
  const [categories] = useOutlet('categories');

  function renderCustomAdminSection(props) {
    const {name, type, context} = props;

    if (
      type === 'form' &&
      name === 'AdminOrderDetailForm' &&
      context.position === 'bottom'
    ) {
      return <div>Hello!!</div>;
    } else if (
      type === 'form' &&
      name === 'ArticleFormHi' &&
      context.position === 'top'
    ) {
      return <div>article!</div>;
    } else if (
      type === 'form' &&
      name === 'site-form' &&
      context.position === 'top'
    ) {
      return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            onClick={async () => {
              message.success('早安');
            }}>
            按鈕
          </Button>
        </div>
      );
    }
    return null;
  }

  function renderCustomAdminCol(props) {
    const {col, record} = props;
    if (col.customType === 'label') {
      return record.label?.map((l, idx) => <Tag>{l}</Tag>);
    } else if (col.customType === 'ORDER_STATUS') {
      return (
        <div>
          {record.status === 'waiting' && '未處理'}
          {record.status === 'done' && '已完成'}
          {record.status === 'canceled' && '已取消'}
        </div>
      );
    }
    return null;
  }

  if (path === '/admin/products') {
    pageContext.resource.formSpec.schema.properties.region.items.anyOf = categories.map(
      (c) => ({
        type: 'string',
        enum: [c.name],
        title: c.display,
      }),
    );
    pageContext.resource.formSpec.schema.properties.attribute.items.anyOf = Object.entries(
      ATTRIBUTE_DISPLAY,
    ).map((attr) => ({
      type: 'string',
      enum: [attr[0]],
      title: attr[1],
    }));
  }

  return (
    <AdminResource
      renderCustomAdminCol={renderCustomAdminCol}
      renderCustomAdminSection={renderCustomAdminSection}
      {...props}
    />
  );
}

export default AdminResourcePage;

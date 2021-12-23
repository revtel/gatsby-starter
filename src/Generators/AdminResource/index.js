import React from 'react';
import AdminResource from 'rev.sdk.js/Generators/AdminResource';
import {Button, message, Tag} from 'antd';

function AdminResourcePage(props) {
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

  return (
    <AdminResource
      renderCustomAdminCol={renderCustomAdminCol}
      renderCustomAdminSection={renderCustomAdminSection}
      {...props}
    />
  );
}

export default AdminResourcePage;

import React from 'react';
import {ArticleEditor} from 'rev.sdk.js';
import {Button, message, Tag} from 'antd';
import AdminOrderDetailForm from './Components/AdminOrderDetailForm';
import * as AppActions from '../src/AppActions';

function renderCustomSection(props) {
  const {name, type, context, path} = props;

  if (
    type === 'form' &&
    name === 'AdminOrderDetailForm' &&
    context.position === 'bottom'
  ) {
    return <AdminOrderDetailForm {...props} />;
  } else if (
    type === 'form' &&
    name === 'ArticleFormHi' &&
    context.position === 'top'
  ) {
    return (
      <ArticleEditor
        collection={{name: 'Article_Default'}} // will be removed in sdk
        onUpdate={() => 0} // will be removed in sdk
        onClose={() => 0} // will be removed in sdk
        document={context?.instance}
      />
    );
  } else if (
    type === 'form' &&
    name === 'site-form' &&
    context.position === 'top'
  ) {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          onClick={async () => {
            try {
              await AppActions.rebuild();
              message.success('已觸發網站更新中...');
            } catch (e) {
              message.error('無法觸發網站更新！請聯絡工程團隊');
            }
          }}>
          發布網站
        </Button>
      </div>
    );
  }
  return null;
}

function renderCustomCol(props) {
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

export {renderCustomSection, renderCustomCol};

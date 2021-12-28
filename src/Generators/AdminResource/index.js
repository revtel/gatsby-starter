import React from 'react';
import AdminResource from 'rev.sdk.js/Generators/AdminResource';
import {Button, message, Tag} from 'antd';
import {useOutlet} from 'reconnect.js';
import {ATTRIBUTE_DISPLAY, REGION_DISPLAY} from '../../constants';

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
    if (col.customType === 'region') {
      return record.region?.map((l, idx) => (
        <Tag key={idx}>{REGION_DISPLAY[l].zh}</Tag>
      ));
    } else if (col.customType === 'attribute') {
      return record.attribute?.map((l, idx) => (
        <Tag color={ATTRIBUTE_DISPLAY[l].color} key={idx}>
          {ATTRIBUTE_DISPLAY[l].zh}
        </Tag>
      ));
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
      title: attr[1].zh,
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

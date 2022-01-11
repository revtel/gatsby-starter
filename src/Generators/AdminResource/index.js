import React from 'react';
import AdminResource from 'rev.sdk.js/Generators/AdminResource';
import {Button, message, Tag} from 'antd';
import {useOutlet} from 'reconnect.js';
import {ATTRIBUTE_DISPLAY, REGION_DISPLAY} from '../../constants';
import AdminOrderDetailForm from './AdminOrderDetailForm';
import {ArticleEditor} from 'rev.sdk.js';

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
      return <AdminOrderDetailForm context={context} />;
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
    } else if (col.customType === 'label') {
      return record.label?.map((l, idx) => <Tag key={idx}>{l}</Tag>);
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

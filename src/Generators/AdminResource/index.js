import React from 'react';
import {useOutlet} from 'reconnect.js';
import AdminForm from './AdminForm';
import TableEditor from './TableEditor';
import * as Generic from '../../Generic';

function AdminResourcePage(props) {
  const [actions] = useOutlet('actions');
  const {
    pageContext: {resource, config},
  } = props;

  const {
    inlineEditor,
    collection,
    primaryKey = 'id',
    searchField = 'searchText',
    path,
    name,
    columns,
    querySpec,
    formSpec,
    createFormSpec,
    actionBar = ['article', 'file'],
  } = resource;

  if (inlineEditor) {
    return <TableEditor resource={resource} config={config} />;
  }

  function fetchRecords({sort, keyword, paging} = {}) {
    return actions.fetchDocuments(
      collection,
      keyword
        ? {
            [searchField]: {
              $regex: `${keyword}`,
              $options: 'g',
            },
          }
        : {},
      sort ? [sort] : [],
      paging,
    );
  }

  function fetchRecordById(id) {
    return actions.fetchOneDocument(collection, {[primaryKey]: id});
  }

  const columns_ = columns.map((col) => {
    if (col.dataType === 'boolean') {
      col.render = (_, record) => <div>{record.public ? '是' : '否'}</div>;
    }
    return col;
  });

  return (
    <Generic.Resource
      location={props.location}
      spec={{
        path,
        name,
        primaryKey,
        actions: {
          setLoading: actions.setLoading,
          fetchRecords,
          fetchRecordById,
        },
        columns: columns_,
      }}
      querySpec={querySpec}
      renderDetail={(props) => {
        if (props.instance) {
          return (
            <AdminForm
              {...props}
              collection={collection}
              actionBar={actionBar}
              formSpec={formSpec}
              config={config}
            />
          );
        } else {
          return (
            <AdminForm
              {...props}
              collection={collection}
              actionBar={actionBar}
              formSpec={createFormSpec || formSpec}
              config={config}
            />
          );
        }
      }}
    />
  );
}

export default AdminResourcePage;

import React from 'react';
import {useOutlet} from 'reconnect.js';
import AdminForm from './AdminForm';
import * as Generic from '../../Generic';

function AdminResourcePage(props) {
  const [actions] = useOutlet('actions');
  const {
    pageContext: {resource, config},
  } = props;

  const {
    collection,
    primaryKey = 'id',
    searchField = 'searchText',
    path,
    name,
    columns,
    querySpec,
    formSpec,
    actionBar = ['article', 'file'],
  } = resource;

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
      renderDetail={(props) => (
        <AdminForm
          {...props}
          collection={collection}
          actionBar={actionBar}
          formSpec={formSpec}
          config={config}
        />
      )}
    />
  );
}

export default AdminResourcePage;

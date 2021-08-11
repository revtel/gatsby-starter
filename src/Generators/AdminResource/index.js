import React from 'react';
import {useOutlet} from 'reconnect.js';
import AdminForm from './AdminForm';
import TableEditor from './TableEditor';
import * as Generic from '../../Generic';
import * as AppActions from '../../AppActions';
import * as JStorageActions from '../../Actions/JStorage';

function AdminResourcePage(props) {
  const [user] = useOutlet('user');
  const {
    pageContext: {resource, config},
  } = props;

  const {
    inlineEditor,
    collection,
    primaryKey = 'id',
    searchField = 'searchText',
    searchFields,
    predefinedQueries,
    userField,
    path,
    name,
    columns,
    querySpec,
    formSpec,
    createFormSpec,
    actionBar = ['article', 'file'],
    renderCreateButton,
    renderDetailButton,
  } = resource;

  if (inlineEditor) {
    return <TableEditor resource={resource} config={config} />;
  }

  async function fetchRecords({sort, keyword, paging} = {}) {
    const resp = await AppActions.fetchCustomResources(resource, {
      sort,
      keyword,
      paging,
    });

    if (resp === null) {
      const query = {};

      if (Array.isArray(predefinedQueries)) {
        for (const q of predefinedQueries) {
          Object.assign(query, q);
        }
      }

      if (userField) {
        query[userField] = user.sub;
      }

      if (Array.isArray(searchFields)) {
        const searchArr = [];
        for (const field of searchFields) {
          searchArr.push({[field]: {$regex: `${keyword}`}});
        }
        query['$or'] = searchArr;
      } else if (searchField) {
        query[searchField] = {
          $regex: `${keyword}`,
        };
      }

      return await JStorageActions.fetchDocuments(
        collection,
        query,
        sort ? [sort] : [],
        paging,
      );
    }

    return resp;
  }

  function fetchRecordById(id) {
    return JStorageActions.fetchOneDocument(collection, {[primaryKey]: id});
  }

  const columns_ = columns.map((col) => {
    if (col.dataType === 'boolean') {
      col.render = (_, record) => (
        <div>{record[col.dataIndex] ? '是' : '否'}</div>
      );
      col.render = (_, record) => (
        <div>{record[col.dataIndex] ? '是' : '否'}</div>
      );
    } else if (col.dataType === 'timestamp') {
      col.render = (_, record) => (
        <div>{new Date(record[col.dataIndex]).toISOString().split('T')[0]}</div>
      );
    } else if (col.customType) {
      col.render = (_, record) => {
        return AppActions.renderCustomAdminCol({col, record});
      };
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
          setLoading: AppActions.setLoading,
          fetchRecords,
          fetchRecordById,
        },
        columns: columns_,
      }}
      querySpec={querySpec}
      renderCreateButton={renderCreateButton}
      renderDetailButton={renderDetailButton}
      renderCustomSection={AppActions.renderCustomAdminSection}
      renderDetail={(props) => {
        if (props.instance) {
          return (
            <AdminForm
              {...props}
              collection={collection}
              actionBar={actionBar}
              formSpec={formSpec}
              config={config}
              path={path}
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
              path={path}
            />
          );
        }
      }}
    />
  );
}

export default AdminResourcePage;

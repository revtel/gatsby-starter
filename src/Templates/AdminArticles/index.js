import React from 'react';
import {useOutlet} from 'reconnect.js';
import * as Generic from '../../Generic';
import Config from '../../../data.json';

function AdminArticles(props) {
  const [actions] = useOutlet('actions');
  const [user] = useOutlet('user');

  return (
    <Generic.Resource
      spec={{
        path: '/dashboard/articles',
        name: '文章',
        primaryKey: 'id',
        actions: {
          setLoading: actions.setLoading,
          fetchRecords: actions.fetchArticles,
          fetchRecordById: actions.fetchRecordById,
        },
        columns: [
          {
            title: '名稱',
            key: 'title',
            dataIndex: 'title',
          },
        ],
      }}
      onCreate={() => {
        window.open(`${Config.articleEditorHost}?token=${user.token}`);
      }}
      onGoToDetail={(record) => {
        window.open(
          `${Config.articleEditorHost}?token=${user.token}&id=${record.id}`,
        );
      }}
      renderDetail={() => null}
      {...props}
    />
  );
}

export default AdminArticles;

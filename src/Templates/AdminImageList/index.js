import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import * as Generic from '../../Generic';
import FileUpload from '../../Generators/AdminResource/FileUpload';
import * as AppActions from '../../AppActions';
import * as StorageActions from '../../Actions/Storage';

function AdminImageList(props) {
  const [updater, setUpdater] = React.useState(0);

  const buildFullPath = (filename) => filename;

  function onFinished(fileUrl) {
    console.log('updated', fileUrl);
    setUpdater(updater + 1);
  }

  return (
    <Generic.Resource
      // force the listview to update after upload finished
      key={updater}
      spec={{
        path: '/admin/images',
        name: '圖片',
        primaryKey: 'id',
        actions: {
          setLoading: AppActions.setLoading,
          fetchRecords: async () => {
            const {filenames} = await StorageActions.fetchUploads();
            return filenames;
          },
          fetchRecordById: () => 0,
        },
        columns: [
          {
            title: '預覽',
            key: 'preview',
            render: (_, record) => <Image src={buildFullPath(record)} />,
          },
          {
            title: 'URL',
            key: 'name',
            render: (_, record) => <div>{buildFullPath(record)}</div>,
          },
          {
            title: '連結',
            key: 'link',
            render: (_, record) => (
              <Button
                onClick={() => {
                  window.open(buildFullPath(record), '_blank');
                }}>
                開啟
              </Button>
            ),
          },
        ],
      }}
      renderDetailButton={null}
      renderCreateButton={() => <FileUpload onFinished={onFinished} />}
      renderDetail={() => null}
      {...props}
    />
  );
}

const Image = styled.img`
  width: 240px;
  height: 180px;
  object-fit: contain;
  background-color: white;
  border: 1px dashed #ccc;
  border-radius: 4px;
`;

export default AdminImageList;

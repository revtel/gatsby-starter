import React from 'react';
import {Upload, Button} from 'antd';
import * as AppActions from '../../AppActions';
import * as StorageActions from '../../Actions/Storage';

const initialImageValue = {
  url: null,
  data: {},
  filename: null,
};

function ImageUpload(props) {
  const {onFinished} = props;
  const [image, setImage] = React.useState(initialImageValue);

  const beforeUpload = async (file) => {
    try {
      AppActions.setLoading(true);
      let resp = await StorageActions.getUploadUrlFromFile(file);
      setImage({
        url: resp.url,
        data: resp.fields,
        filename: resp.expected,
      });
    } catch (err) {
      alert('Api error');
      AppActions.setLoading(false);
    }
  };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      AppActions.setLoading(false);
      alert(`成功! ${image.filename}`);
      setImage(initialImageValue);
      if (onFinished) {
        onFinished(image.filename);
      }
    }
  };

  return (
    <Upload
      name="file"
      listType="picture container"
      showUploadList={false}
      action={image.url}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      data={image.data}>
      <Button>上傳檔案</Button>
    </Upload>
  );
}

export default ImageUpload;

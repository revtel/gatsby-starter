import React from 'react';
import {useOutlet} from 'reconnect.js';
import {Upload, Button} from 'antd';

const initialImageValue = {
  url: null,
  data: {},
  filename: null,
};

function ImageUpload(props) {
  const [actions] = useOutlet('actions');
  const {onFinished} = props;
  const [image, setImage] = React.useState(initialImageValue);

  const beforeUpload = async (file) => {
    try {
      actions.setLoading(true);
      let resp = await actions.getUploadUrlFromFile(file);
      setImage({
        url: resp.url,
        data: resp.fields,
        filename: resp.expected,
      });
    } catch (err) {
      alert('Api error');
      actions.setLoading(false);
    }
  };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      actions.setLoading(false);
      alert(`成功! ${image.filename}`);
      setImage(initialImageValue);
      if (onFinished) {
        onFinished();
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

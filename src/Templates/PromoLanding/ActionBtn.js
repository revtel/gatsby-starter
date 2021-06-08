import React from 'react';
import {Button} from 'antd';

function ActionBtn(props) {
  const {link, text, style = {}} = props;

  if (!link) {
    return null;
  }

  return (
    <Button href={link} target="_blank" style={{marginTop: 10, ...style}}>
      {text || '馬上行動'}
    </Button>
  );
}

export default ActionBtn;

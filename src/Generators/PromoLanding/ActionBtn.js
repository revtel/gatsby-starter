import React from 'react';
import {Button} from 'antd';
import {Link} from 'gatsby';
import {useOutletSetter} from 'reconnect.js';

function ActionBtn(props) {
  const {link, text, type = 'default', size = 'default', style = {}} = props;
  const openContactModal = useOutletSetter('contact-modal');

  if (!link) {
    return null;
  }

  if (link === 'contact') {
    return (
      <Button
        style={{marginTop: 10, ...style}}
        type={type}
        size={size}
        onClick={() => openContactModal(true)}>
        {text || '馬上行動'}
      </Button>
    );
  }

  if (link[0] === '/') {
    return (
      <Link to={link}>
        <Button type={type} size={size} style={{marginTop: 10, ...style}}>
          {text || '馬上行動'}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      type={type}
      size={size}
      href={link}
      target="_blank"
      style={{marginTop: 10, ...style}}>
      {text || '馬上行動'}
    </Button>
  );
}

export default ActionBtn;

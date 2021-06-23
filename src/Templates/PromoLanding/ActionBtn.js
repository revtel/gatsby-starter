import React from 'react';
import {Button} from 'antd';
import {Link} from 'gatsby';

function ActionBtn(props) {
  const {link, text, size, style = {}} = props;

  if (!link) {
    return null;
  }

  const sizeProps = size === 'large' ? {size: 'large'} : {};

  if (link[0] === '/') {
    return (
      <Link to={link}>
        <Button style={{marginTop: 10, ...style}} {...sizeProps}>
          {text || '馬上行動'}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      href={link}
      target="_blank"
      style={{marginTop: 10, ...style}}
      {...sizeProps}>
      {text || '馬上行動'}
    </Button>
  );
}

export default ActionBtn;

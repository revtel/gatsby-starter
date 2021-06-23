import React from 'react';
import {Breadcrumb} from 'antd';
import {useOutlet} from 'reconnect.js';

function BreadcrumbBar(props) {
  const [categoryDisplayMap] = useOutlet('categoryDisplayMap');
  const {cat = '', updateCat} = props;
  const catItems = cat.split('-');

  const onCatClick = (idx) => () => {
    updateCat(catItems.slice(0, idx + 1).join('-'));
  };

  const getCatDisplay = (idx) => {
    return categoryDisplayMap[catItems.slice(0, idx + 1).join('-')];
  };

  return (
    <Breadcrumb>
      <Breadcrumb.Item
        style={{cursor: 'pointer'}}
        onClick={() => {
          updateCat('');
        }}>
        全站商品
      </Breadcrumb.Item>
      {catItems.map((_, idx) => {
        return (
          <Breadcrumb.Item
            key={idx}
            onClick={onCatClick(idx)}
            style={{cursor: 'pointer'}}>
            {getCatDisplay(idx)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbBar;

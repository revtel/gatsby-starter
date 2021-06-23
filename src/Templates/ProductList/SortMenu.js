import React from 'react';
import {useOutlet} from 'reconnect.js';
import {Menu, Dropdown} from 'antd';

function SortMenu(props) {
  const [options] = useOutlet('sortOptions');
  const {sort, updateSort} = props;

  const selectedOption = options.find((opt) => opt.name === sort);

  return (
    <>
      <label style={{margin: '0px 10px'}}>排序</label>
      <div style={{marginRight: 10}}>
        <Dropdown
          overlay={
            <Menu>
              {options.map((option) => {
                return (
                  <Menu.Item
                    key={option.name}
                    onClick={() => {
                      updateSort(option.name);
                    }}>
                    {option.display}
                  </Menu.Item>
                );
              })}
            </Menu>
          }>
          <div>{(selectedOption && selectedOption.display) || '請選擇'}</div>
        </Dropdown>
      </div>
    </>
  );
}

export default SortMenu;

import React from 'react';
import {Menu} from 'antd';
import {useOutlet} from 'reconnect.js';

function FilterMenu(props) {
  const [categories] = useOutlet(props.categories);
  const {cat, updateCat} = props;

  const onMenuClick = (catName) => () => {
    updateCat(catName);
  };

  return (
    <Menu style={{width: 256}} selectedKeys={cat ? [cat] : []} mode="inline">
      {categories.map((topLevel) => {
        if (topLevel.items?.length > 0) {
          return (
            <Menu.SubMenu key={topLevel.name} title={topLevel.display}>
              <Menu.Item
                key={topLevel.name}
                onClick={onMenuClick(topLevel.name)}>
                所有{topLevel.display}
              </Menu.Item>

              {topLevel.items.map((secondLevel) => {
                if (secondLevel.items?.length > 0) {
                  return (
                    <Menu.SubMenu
                      key={secondLevel.name}
                      title={secondLevel.display}>
                      <Menu.Item
                        key={secondLevel.name}
                        onClick={onMenuClick(secondLevel.name)}>
                        所有{secondLevel.display}
                      </Menu.Item>
                      {secondLevel.items.map((thirdLevel) => {
                        return (
                          <Menu.Item
                            key={thirdLevel.name}
                            onClick={onMenuClick(thirdLevel.name)}>
                            {thirdLevel.display}
                          </Menu.Item>
                        );
                      })}
                    </Menu.SubMenu>
                  );
                }
                return (
                  <Menu.Item
                    key={secondLevel.name}
                    onClick={onMenuClick(secondLevel.name)}>
                    {secondLevel.display}
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        }

        return (
          <Menu.Item key={topLevel.name} onClick={onMenuClick(topLevel.name)}>
            {topLevel.display}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default FilterMenu;

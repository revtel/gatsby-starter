import React from 'react';
import {Input} from 'antd';

function SearchInput(props) {
  const {search, updateSearch} = props;
  const [value, setValue] = React.useState(search);

  return (
    <>
      <div style={{flex: 1}} />
      <label style={{marginRight: 10}}>搜尋</label>
      <Input.Search
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="請輸入關鍵字"
        onSearch={() => {
          updateSearch(value);
        }}
        style={{width: 180}}
      />
    </>
  );
}

export default SearchInput;
